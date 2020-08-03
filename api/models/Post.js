var mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        requiredAmount: {
            type: Number,
            required: true,
            default: 0
        },
        page: { type: mongoose.Schema.Types.ObjectId, ref: 'Page' },
    },
    {
        timestamps: true
    }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;