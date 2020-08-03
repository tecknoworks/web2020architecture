var mongoose = require('mongoose');

var Tier = require('./Tier');
var Post = require('./Post');

const pageSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        avatar: {
            type: String,
            required: true
        },
        banner: {
            type: String,
            required: true
        },

        tiers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tier' }],
        posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    },
    {
        timestamps: true
    }
);

pageSchema.pre('findOneAndRemove', function (next) {
    // Delete relationships
    Tier.deleteMany({ page: this._conditions._id }).exec();
    Post.deleteMany({ page: this._conditions._id }).exec();

    next();
});

const Page = mongoose.model('Page', pageSchema);

module.exports = Page;