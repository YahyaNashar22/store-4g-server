import uShareBundlesSchema from "../models/uShareBundlesModel.js";

export const createBundle = async (req,res) =>{
    try{
      const { name, price } = req.body;
      const newBundle =  new uShareBundlesSchema({
        name,price
      });
      await newBundle.save();
      res.status(201).json({message:"Bundle created successfully !", payload:newBundle})
    } catch(e) {
        res.status(500).json({message: e.message})
    }
}

export const editBundle = async (req,res)=>{
    try{
        const { name, price, id} = req.body;
        const editedBundle = await uShareBundlesSchema.findOneAndUpdate(
            {_id:id},
            {$set:{name,price}} ,
            {new:true}
            );
        res.status(201).json({message:"Bundle edited successfully !", payload:editedBundle});
    } catch(e) {
        res.status(500).json({message: e.message})
    }
}

export const deleteBundle = async (req,res)=>{
    const {id} = req.body;
    try{
       const deletedBundle = await uShareBundlesSchema.findOneAndDelete({_id:id})
        if(!deletedBundle){
            return res.status(404).json("This Bundle is not available.")
        }
        res.status(201).json({message:`${deletedBundle.name} deleted successfully!`})
    } catch(e) {
        res.status(500).json({message: e.message})
    }
}

export const getAllBundles=async(req,res)=> {
    try{
        const allBundles = await uShareBundlesSchema.find();
        res.status(201).json({message:"Bundles fetched successfully!", payload:allBundles});
    } catch(e) {
        res.status(500).json({message: e.message})
    }
}

export const getOneBundle = async (req,res)=>{
    const slug = req.params.slug;
    try{
        const bundle = await uShareBundlesSchema.findOne({slug:slug});
        if(!bundle){
            return res.status(404).json("This Bundle is not available.")
        }
        res.status(201).json({message:'The Bundle was found',payload:bundle});
    } catch(e) {
        res.status(500).json({message: e.message})
    }
}