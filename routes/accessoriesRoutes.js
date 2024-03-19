import express from "express"
import upload from "../middlewares/multer.js"
import { createAccessory,editAccessory,editAccessoryPicture,deleteAccessory,getAllAccessories,oneAccessory, searchAccessories } from "../controllers/accessoriesControllers.js"

export const accessoriesRouter = express.Router();

accessoriesRouter.post("/create",upload.single('image'), createAccessory )
accessoriesRouter.post("/search", searchAccessories)
accessoriesRouter.put("/edit", editAccessory )
accessoriesRouter.put("/editpicture",upload.single('image'), editAccessoryPicture )
accessoriesRouter.delete("/delete", deleteAccessory )
accessoriesRouter.get("/get", getAllAccessories )
accessoriesRouter.get("/get/:slug", oneAccessory )