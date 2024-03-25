import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./utils/dbConfig.js"
import { uShareBundlesRouter } from "./routes/uShareBundlesRoutes.js";
import { rechargeCardRouter } from "./routes/rechargeCardRoutes.js";
import { accessoriesRouter } from "./routes/accessoriesRoutes.js";
import { userRouter } from "./routes/userRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    cors({
      origin: ["http://localhost:3000","store-4g-client.vercel.app","https://store-4g-client.vercel.app/accessories"],
      credentials: true,
      optionsSuccessStatus: 200,
    })
  );

app.use(express.static("images"));

app.use('/uShareBundles',  uShareBundlesRouter);
app.use("/rechargeCards", rechargeCardRouter);
app.use("/accessories", accessoriesRouter);
app.use("/users", userRouter);

const port = process.env.PORT || 5000
  
app.listen(port, () => {
    console.log("listening on port: " + port);
});

connectDB();