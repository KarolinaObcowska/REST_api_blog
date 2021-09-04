import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            minlength: 10
        },
        content: {
            type: String,
            reqired: true,
            minlength: 300
        },
        user: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User',
            required: true
        },
        comments: [
            {
                user: {
                    type: mongoose.SchemaTypes.ObjectId,
                    ref: 'User'
                },
                text: {
                    type: String,
                    required: true
                },
                date: {
                    type: Date,
                    default: Date.now()
                }
            }
        ]
    },
    { timestamps: true }
);

export const Post = mongoose.model('Post', postSchema);