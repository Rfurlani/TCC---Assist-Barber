import { Router } from "express";
import authController from "../controllers/authController.js";
import catchAsync from "../middleware/catchAsync.js";
import authentication from '../middleware/autenticar.js';


const { cadastrar, login, protegerRota, logout } = authController;
const { autenticar } = authentication;

const authRouter = Router();

authRouter.post('/cadastrar', catchAsync(cadastrar));
authRouter.post('/login', catchAsync(login));
authRouter.get('/protegida', autenticar, catchAsync(protegerRota));

export default authRouter;