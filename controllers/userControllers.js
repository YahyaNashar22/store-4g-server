import userSchema from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { createToken, verifyToken } from "../utils/token.js";

//Sign up
export const signup = async (req,res) =>{
    try{
      const { email, name, password } = req.body;
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const newUser =  new userSchema({
        name,
        password:hash,
        email
      });
      await newUser.save();
      const token = createToken(newUser);
      const decoded = verifyToken(token);
      res
      .status(201)
      .cookie("userToken", token, {
        secure: true,
        httpOnly: true,
        sameSite: "None",
      })
      .json({ message: "user created successfully", token: decoded });
    } catch(e) {
        res.status(500).json({message: e.message})
    }
}

// Log in
export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email: email });
    if (!user) {
      return res.status(401).send("user not found !");
    } else {
      try {
        if (await bcrypt.compare(password, user.password)) {
          const token = createToken(user);
          const decoded = verifyToken(token);
          res
            .cookie("userToken", token, {
              secure: true,
              httpOnly: true,
              sameSite: "None",
            })
            .status(200)
            .json({ message: "user logged in successfully", token: decoded });
        }
      } catch (error) {
        console.log(err);
      }
    }
  };

// Log out
export const logout = (req, res) => {
    console.log("cookie cleared");
    return res
      .clearCookie("userToken")
      .status(200)
      .send("successfully logged out");
  };

// edit user
export const editUser = async(req,res)=>{
    const slug = req.params.slug;
    try{
        const { name, password  } = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const editedUser = await userSchema.findOneAndUpdate(
            {slug:slug},
            {$set:{name, password:hash}},
            {new:true}
        );
        if(!editedUser){
          return res.status(404).json({message:"No User Found"});
        }
        const token = createToken(editedUser);
        const decoded = verifyToken(token);
        res.status(200).json({message:"edited successfully", payload:decoded});
    } catch(e) {
        res.status(500).json({message: e.message})
    }
}

// check Password
export const checkPassword = async(req,res)=>{
    try{
        const {email, password} = req.body;
        const user = await userSchema.findOne({email:email})
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (isPasswordCorrect) {
            return res.status(200).json({ message: 'Password is correct' });
          } else {
            return res.status(401).json({ message: 'Incorrect password' });
          }
    } catch(e) {
        res.status(500).json({message: e.message})
    }
}

// change role
export const changeRole = async(req,res)=>{
    const slug = req.params.slug;
    try{
        const { role} = req.body;
        const user = await userSchema.findOne(
            {slug:slug},
            {$set:{role}},
            {new:true}
            );
        if(!user){
            return res.status(404).json({message:'User not found.'});
        }
        res.status(201).json({message:"edited role", payload:user})
    } catch(e) {
        
    }
}

// delete user
export const deleteUser = async (req,res)=>{
    const slug = req.params.slug
    try{
       const deletedUser = await userSchema.findOneAndDelete({slug:slug})
        if(!deletedUser){
            return res.status(404).json("user not found.")
        }
        res.status(201).json({message:`${deletedUser.name} deleted successfully!`})
    } catch(e) {
        res.status(500).json({message: e.message})
    }
}

// get all users
export const getAllUsers=async(req,res)=> {
    try{
        const allUsers = await userSchema.find();
        res.status(201).json({message:"users fetched successfully!", payload:allUsers});
    } catch(e) {
        res.status(500).json({message: e.message})
    }
}

// get one user
export const getOneUser = async (req,res)=>{
    const slug = req.params.slug;
    try{
        const user = await userSchema.findOne({slug:slug});
        if(!user){
            return res.status(404).json("This user is not available.")
        }
        res.status(201).json({message:'The user was found',payload:user});
    } catch(e) {
        res.status(500).json({message: e.message})
    }
}

// Fetch one user by ID
export const getOne = async (req, res) => {
    const token = req.cookies.userToken;
    const decoded = verifyToken(token);
    const id = decoded.data?.id;
    try {
      if (!id) {
        return res.status(400).json({ error: "No Token!" });
      }
      const user = await userSchema.findById(id);
      if (user) {
        return res.json({
            name:user.name,
            email:user.email,
            role:user.role
        });
      } else {
        return res.status(404).json({ error: "User Not Found!" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Couldn't find user" });
    }
  };