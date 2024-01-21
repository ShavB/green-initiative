import mongoose from "mongoose";

const schema = mongoose.Schema;

const userSchema = new schema({
    username: {
        type: String,
        min: 6,
        max: 12,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    authentication: {
        password: {type: String, required: true, select: false},
        salt: {type: String, select: false},
        sessionToken: {type: String, select: false}
    },
    userRole: {
        type: String,
        default: "client",
    },
    registerationDate: {
        type: Number,
        default: Date.now,
    },
});

const userModel = mongoose.model("userModel", userSchema);
export default userModel;