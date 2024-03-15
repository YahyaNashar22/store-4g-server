import express from "express"
import upload from "../middlewares/multer.js"
import { createCard,editCard,editCardPicture,deleteCard,getAllCards,oneCard, getCardsByCarrier } from "../controllers/rechargeCardControllers.js"

export const rechargeCardRouter = express.Router();

rechargeCardRouter.post("/create",upload.single('image'), createCard )
rechargeCardRouter.post('/cardsbycarrier', getCardsByCarrier)
rechargeCardRouter.put("/edit/:slug", editCard )
rechargeCardRouter.put("/editpictrue/:slug",upload.single('image'), editCardPicture )
rechargeCardRouter.delete("/delete/:slug", deleteCard )
rechargeCardRouter.get("/get", getAllCards )
rechargeCardRouter.put("/get/:slug", oneCard )