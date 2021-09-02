import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs'

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true
        },

        lastName: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        status: {
            type: String,
            default: 'I am new'
        },
        
        posts: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Post'
        }
    }
);

export const User = mongosee.model('User', userSchema);