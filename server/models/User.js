import mongoose from "mongoose";
import bcrypt from "bcrypt";

const  UserSchema = new mongoose.Schema(
    {
        userType: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            unique: true,
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true
        }
    },
    {
        timestamps: true,
    }
);

UserSchema.pre("save")
const User = mongoose.model("User", UserSchema);
export default User;