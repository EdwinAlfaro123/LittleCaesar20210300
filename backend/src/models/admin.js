import mongoose, {Schema, model} from "mongoose";

const adminSchema = new Schema({
    name: { 
        type: String
    },

    email: {
        type: String
    },

    password: {
        type: String
    },

    isVerified: {
        type: Boolean
    },

    loginAttemps: {
        type: Number
    },

    timeOut: {
        type: Number
    }
},{
    timestamps: true,
    strict: false
});

export default model("Admin", adminSchema);