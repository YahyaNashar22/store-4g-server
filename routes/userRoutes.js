import express from "express"
import {
    signup, login, logout, editUser, checkPassword, changeRole, deleteUser, getAllUsers, getOneUser, getOne
} from "../controllers/userControllers.js"
import { authorized } from "../middlewares/authorization.js"

export const userRouter = express.Router()

userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.get('/logout',authorized, logout);
userRouter.put('/edit/:slug', editUser);
userRouter.post('/checkpassword', checkPassword);
userRouter.put('/changerole/:slug', changeRole);
userRouter.delete('/delete/:slug', deleteUser);
userRouter.get('/get', getAllUsers);
userRouter.get('/getone', getOne);
userRouter.post('/get/:slug', getOneUser);