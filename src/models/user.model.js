import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs'

const userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
            trim: true
        },

        lastname: {
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
            required: true,
            minlength: 8
        },

        status: {
            type: String,
            default: 'I am new'
        },
        
        posts: [
            {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Post'
            }
        ]
    }
);

export const User = mongoose.model('User', userSchema);