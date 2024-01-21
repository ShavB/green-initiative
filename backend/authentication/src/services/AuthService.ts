import userModel from "../models/user";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { createUser, getUserByEmail } from "../repository/repository";
import { authentication, generateToken, random } from "../helpers/Helpers";
import jwt from "jsonwebtoken";

/**
 * @class
 * AuthService class
 * * Register user
 * * login user
 */

export class AuthService {
    /**
     * Generate a JWT token
     * @param userId
     */

    /**
     * Register a user into DB
     * @param username
     * @param email
     * @param password
     */

    async RegisterUser(req: Request, res: Response) {
        try {
            // Destructure user data from userStatus
            const { username, email, password } = req.body;

            // Check if the user exists
            const userExists = await getUserByEmail(email);

            // If user does not exist, create a new user
            if (!userExists) {
                const salt = random();
                const userStatus = await createUser({
                    username,
                    email,
                    authentication: {
                        salt,
                        password: authentication(salt, password),
                    },
                });

                res.sendStatus(200).json(userStatus).end();
            } else {
                return { status: 400 };
            }
        } catch (e: any) {
            console.error("User registration failed", e.message);
        }
    }

    async loginUser(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const user = await getUserByEmail(email).select(
                "+authentication.salt +authentication.password"
            );

            const userId = await getUserByEmail(email).select("_id");

            if (!user) {
                return res.sendStatus(400);
            }

            if (
                !user.authentication ||
                !user.authentication.salt ||
                !user.authentication.password
            ) {
                return res.sendStatus(400);
            }

            const hashedPass = authentication(
                user.authentication.salt,
                password
            );
            if (hashedPass !== user.authentication.password) {
                return res.sendStatus(401);
            }

            const token = generateToken(email);
            user.authentication.sessionToken = token;
            await user.save();
            // res.cookie("green-auth-token", token);
            res.setHeader("Authorization", `Bearer ${token}`);
            return res.status(200).json({ email, token }).end();
        } catch (e: any) {
            console.error("User login failed", e.message);
            res.sendStatus(500);
        }
    }

    async logoutUser(email: string): Promise<boolean> {
        console.log("email ---> ", email);
        try {
            const userData = await getUserByEmail(email).select(
                "+authentication.salt +authentication.password + authentication.sessionToken"
            );
            const userId = await getUserByEmail(email);
            if (
                userData &&
                userData.authentication &&
                userData.authentication.sessionToken
            ) {
                userData.authentication.sessionToken = null;
                await userData.save();
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error(error);
            throw new Error("Logout failed");
        }
    }
}
