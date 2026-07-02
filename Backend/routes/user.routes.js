import { getUserById, getUserResumes, loginUser, registerUser } from "../controllers/user.controllers.js";
import express from 'express';
import protect from "../middlewares/auth.middlware.js";

const userRouter = express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
userRouter.get('/data',protect,getUserById);
userRouter.get('/resumes',protect,getUserResumes)

export default userRouter;

//6:20:01