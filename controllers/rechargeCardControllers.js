import rechargeCardSchema from "../models/rechargeCardModel.js";
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
  

export const createCard = async(req,res) =>{
    try{
        const image = req.file.filename;
        const {name, price, carrier} = req.body;
        
        const newCard = new rechargeCardSchema({
            name,
            price,
            carrier,
            picture:image
        });
        await newCard.save();
        res.status(201).json({message:"card created !", payload:newCard});
    } catch(e) {
        res.status(500).json({message: e.message})
    }
}

export const editCard = async(req,res)=>{
    const slug = req.params.slug;
    try{
        const {name, price, carrier} = req.body;
        const editedCard = await rechargeCardSchema.findOneAndUpdate(
            {slug:slug},
            {$set:{name, price, carrier}},
            {new:true}
        );
        if(!editedCard){
            return res.status(404).json({message:"couldn't card !"})
        }
        res.status(201).json({message:"edited successfully!", payload:editedCard})
    } catch(e) {
        res.status(500).json({message: e.message})
    }
}

export const editCardPicture = async(req,res)=>{
    const slug = req.params.slug;
    try{
        const image = req.file.filename;
        const card = await rechargeCardSchema.findOne({slug:slug});
        if (card.picture){
            removeImage(card.picture);
        }
        const editedCard = await rechargeCardSchema.findOneAndUpdate(
            {slug:slug},
            {set:{picture:image}},
            {new:true}
        )
        if(!editedCard){
            return res.status(404).json({message:"couldn't card !"})
        }
        res.status(201).json({message:"edited successfully!", payload:editedCard})
    } catch(e) {
        res.status(500).json({message: e.message})
    }
}

export const deleteCard = async(req,res)=>{
    const slug = req.params.slug;
    try{
        const card = await rechargeCardSchema.findOne({slug:slug});
        if(card.picture){
            removeImage(card.picture);
        }
        const deltedCard = await rechargeCardSchema.findOneAndDelete({slug:slug})
        if(!deltedCard){
            return res.status(404).json("card not found !")
        }
        res.status(201).json({message:`${deleteCard.name} deleted successfully`})
    } catch(e) {
        res.status(500).json({message: e.message})
    }
}

export const getAllCards = async(req,res)=>{
    try{
        const cards = await rechargeCardSchema.find();
        res.status(201).json({message:"Cards fetched successfully!", payload:cards})
    } catch(e) {
        res.status(500).json({message: e.message})
    }
}

export const oneCard = async(req,res)=>{
    const slug = req.params.slug;
    try{
        const card = await rechargeCardSchema.findOne({slug:slug});
        res.status(201).json({message:"Card Fetched", payload:card})
    } catch(e) {
        res.status(500).json({message: e.message})
    }
}