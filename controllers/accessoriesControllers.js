import accessoriesSchema from "../models/accessoriesModel.js";
import fs from "fs";

function removeImage(image) {
    fs.unlinkSync("images/" + image, (err) => {
      if (err) {
        console.log(`we can't delete the image`);
      } else {
        console.log("image deleted");
      }
    });
  }
  

export const createAccessory = async(req,res) =>{
    try{
        const image = req.file.filename;
        const {name, price, category, brand, quantity} = req.body;
        
        const newAccessory = new accessoriesSchema({
            name,
            price,
            category,
            brand,
            quantity,
            picture:image
        });
        await newAccessory.save();
        res.status(201).json({message:"accessory created !", payload:newAccessory});
    } catch(e) {
        res.status(500).json({message: e.message})
    }
}

export const editAccessory = async(req,res)=>{
    const slug = req.params.slug;
    try{
        const {name, price, category, brand, quantity} = req.body;
        const editedAccessory = await accessoriesSchema.findOneAndUpdate(
            {slug:slug},
            {$set:{name, price, category, brand, quantity}},
            {new:true}
        );
        if(!editedAccessory){
            return res.status(404).json({message:"couldn't find accessory !"})
        }
        res.status(201).json({message:"edited successfully!", payload:editedAccessory})
    } catch(e) {
        res.status(500).json({message: e.message})
    }
}

export const editAccessoryPicture = async(req,res)=>{
    const slug = req.params.slug;
    try{
        const image = req.file.filename;
        const accessory = await accessoriesSchema.findOne({slug:slug});
        if (accessory.picture){
            removeImage(accessory.picture);
        }
        const editedAccessory = await accessoriesSchema.findOneAndUpdate(
            {slug:slug},
            {$set:{picture:image}},
            {new:true}
        )
        if(!editAccessory){
            return res.status(404).json({message:"couldn't find accessory !"})
        }
        res.status(201).json({message:"edited successfully!", payload:editedAccessory})
    } catch(e) {
        res.status(500).json({message: e.message})
    }
}

export const deleteAccessory = async(req,res)=>{
    const slug = req.params.slug;
    try{
        const accessory = await accessoriesSchema.findOne({slug:slug});
        if(accessory.picture){
            removeImage(accessory.picture);
        }
        const deltedAccessory = await accessoriesSchema.findOneAndDelete({slug:slug})
        if(!deltedAccessory){
            return res.status(404).json("accessory not found !")
        }
        res.status(201).json({message:`${deltedAccessory.name} deleted successfully`})
    } catch(e) {
        res.status(500).json({message: e.message})
    }
}

export const getAllAccessories = async(req,res)=>{
    try{
        const accessories = await accessoriesSchema.find();
        res.status(201).json({message:"Accessories fetched successfully!", payload:accessories})
    } catch(e) {
        res.status(500).json({message: e.message})
    }
}

export const oneAccessory = async(req,res)=>{
    const slug = req.params.slug;
    try{
        const accessory = await accessoriesSchema.findOne({slug:slug});
        res.status(201).json({message:"Accessory Fetched", payload:accessory})
    } catch(e) {
        res.status(500).json({message: e.message})
    }
}