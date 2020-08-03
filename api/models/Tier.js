var mongoose = require('mongoose');

const tierSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true,
            default: 0
        },
        active: {
            type: Boolean,
            required: true,
            default: false
        },
        page: { type: mongoose.Schema.Types.ObjectId, ref: 'Page' },
    },
    {
        timestamps: true
    }
);

const Tier = mongoose.model('Tier', tierSchema);

module.exports = Tier;