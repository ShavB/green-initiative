import { getUserByEmail } from "../repository/repository";
import { AuthService } from "../services/AuthService";
import { Request, Response } from "express";

/**
 * Authentication controller class
 ** Register User
 ** Sign-in User
 ** Update user credentials
 * @class
 **/

//  const authService = new AuthService();

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    async registerUser(req: Request, res: Response) {
        try {
            await this.authService.RegisterUser(req, res);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async loginUser(req: Request, res: Response) {
        try {
            // const { email, password } = req.body;
            await this.authService.loginUser(req, res);
        } catch (error: any) {
            console.error(error);
            res.sendStatus(400);
        }
    }

    async logoutUser(req: Request, res: Response) {
        try {
            const { email } = req.body;
            const logoutSuccess = await this.authService.logoutUser(email);
            console.log('logoutSuccess ---> ', logoutSuccess);
            if (logoutSuccess) {
                res.sendStatus(200);
            } else {
                res.sendStatus(400);
            }
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }
}
