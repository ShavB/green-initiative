import express, { Request, Response } from "express";
import { AuthController } from "../controllers/authController";
import { isAuthenticated } from "../middlewares/middleware";

const router = express.Router();
const authController = new AuthController();

router.post("/logout", isAuthenticated, async(req: Request, res: Response)=> {
    await authController.logoutUser(req, res);
});
router.post("/login", async (req: Request, res: Response) => {
    await authController.loginUser(req, res);
});
router.post("/register", async (req: Request, res: Response) => {
    await authController.registerUser(req, res);
});

export default router;
