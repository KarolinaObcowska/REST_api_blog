import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        image: {
            type: String,
            required: true
        },

        content: {
            type: String,
            reqired: true,
            minlength: 300,
        },

        creator: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User',
            required: true
        },
    },
    { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);