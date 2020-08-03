var mongoose = require('mongoose');

var Tier = require('../models/Tier');
var Repository = require('./Repository');

class TierRepository extends Repository {
    constructor(model) {
        super(model);
    }

    async findByPage(pageId) {
        return await this.model.find({ page: pageId }).exec();
    }

    async activate(id) {
        const session = await mongoose.startSession();
        session.startTransaction();

        let tier = await this.model.findById(id).populate('page').exec();

        await this.model.updateMany({ page: tier.page.id }, { active: false });
        await this.model.findByIdAndUpdate(tier.id, { active: true });;

        await session.commitTransaction();
        session.endSession();

        return this.findById(tier.id);
    }

    async findActiveByPage(pageId) {
        return await this.model.findOne({ page: pageId, active: true }).exec();
    }
}

var tierRepository = new TierRepository(Tier);

module.exports = tierRepository;