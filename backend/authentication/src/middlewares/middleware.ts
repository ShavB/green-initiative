import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const secret = "green-global-init";
    console.log(req.headers.Authorization);
    try {
        if (req.headers.authorization) {
            const userAuthToken = req.headers.authorization;            
            const expectedToken = jwt.verify(userAuthToken, secret);
            console.log(expectedToken);
            return next();
        } else {
            console.log("token not found");
        }
    } catch (e) {
        return res.sendStatus(403).json({ message: "Invalid authorization" });
    }
};
