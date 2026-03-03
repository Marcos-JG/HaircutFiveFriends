'use strict';

import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema(
    {
        userId: {
            type: String
        },

        name:{
            type: String,
            required: [true, "Name is required"]
        },

        phone:{
            type: String,
            required: [true, "Phone is required"]
        },

        email:{
            type: String,
            required: [true, "Email is required"],
            unique: true
        },

        profilePicture:{
            type: String,
            default: null
        },

        faceshape: {
            type: String
        },

        points: {
            type: Number,
            default: 0
        },

        status:{
            type: Boolean,
            default: true
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
)

clientSchema.index({ userId: 1});
clientSchema.index({ email: 1 }, { unique: true });
export default mongoose.model("Client", clientSchema);