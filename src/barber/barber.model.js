'use strict';

import mongoose from 'mongoose';

const barberSchema = new mongoose.Schema(
    {
        userId: {
            type: String
        },

        name: {
            type: String,
            required: [true, "Name is required"]
        },

        phone: {
            type: String,
            required: [true, "Phone is required"]
        },

        profilePicture: {
            type: String,
            default: null
        },

        schedule: [
            {
                _id: false,
                days: {
                    type: String
                },
                hours: {
                    type: String
                }
            }
        ],

        status: {
            type: Boolean,
            default: true
        },
    },
    {
        timestamps: true,
        versionKey: false
    })

// Removed email unique index: barber schema does not define `email` and
// a unique index on a non-existent field causes duplicate-key errors
// for documents that lack that field. If you want a uniqueness constraint
// use a real field (e.g. `userId`) and create an index on it instead.
export default mongoose.model("Barber", barberSchema);