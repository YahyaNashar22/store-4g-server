import express from "express"
import {
    createBundle, editBundle, deleteBundle, getAllBundles, getOneBundle
} from "../controllers/uShareBundlesControllers.js"

export const uShareBundlesRouter = express.Router();

uShareBundlesRouter.post("/create",createBundle);
uShareBundlesRouter.put("/edit",editBundle);
uShareBundlesRouter.delete("/delete",deleteBundle);
uShareBundlesRouter.get("/get",getAllBundles);
uShareBundlesRouter.get("/get/:slug",getOneBundle);