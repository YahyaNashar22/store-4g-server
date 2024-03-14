import express from "express"
import upload from "../middlewares/multer.js"
import { createAccessory,editAccessory,editAccessoryPicture,deleteAccessory,getAllAccessories,oneAccessory } from "../controllers/accessoriesControllers.js"

export const accessoriesRouter = express.Router();

accessoriesRouter.post("/create",upload.single('image'), createAccessory )
accessoriesRouter.put("/edit/:slug", editAccessory )
accessoriesRouter.put("/editpicture/:slug",upload.single('image'), editAccessoryPicture )
accessoriesRouter.delete("/delete/:slug", deleteAccessory )
accessoriesRouter.get("/get", getAllAccessories )
accessoriesRouter.get("/get/:slug", oneAccessory )