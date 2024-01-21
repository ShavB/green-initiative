import crypto from "crypto";
import userModel from "../models/user";
import jwt from "jsonwebtoken";

//user `.env file here`
const secret = 'green-global-init';

export const random = () => crypto.randomBytes(128).toString("base64");

export const generateToken = (email: string) => {
    const payload = { email };
    // const token = jwt.sign(payload, secret);
    return jwt.sign(payload, secret, {expiresIn: '8h'});
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, secret);
};

export const authentication = (salt: string, password: string) => {
    return crypto
        .createHmac("sha256", [salt, password].join("/"))
        .update(secret)
        .digest("hex");
};

export const getUserSessionToken = (sessionToken: string) => {
    console.log("session token --> ", sessionToken);
    return userModel.findOne({ "authentication.sessionToken": sessionToken });
};
