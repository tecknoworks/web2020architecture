const TierRepository = require("../repositories/TierRepository");
const PageRepository = require('../repositories/PageRepository');

let get = async (req, res) => {
    let tiers = await TierRepository.get();
    res.json(tiers);
}

let getById = async (req, res) => {
    let id = req.params.id;
    let tier = await TierRepository.findById(id);

    res.json(tier);
}

let getByPageId = async (req, res) => {
    let id = req.params.id;
    let tiers = await TierRepository.findByPage(id);

    let sortedTiers = tiers.sort((a, b) => a.amount - b.amount);
    res.json(sortedTiers);
}

let post = async (req, res) => {
    let data = { ...req.body };
    let page = await PageRepository.findById(data.page);

    if (page == null) {
        res.status(404).json({
            message: 'Page not found!'
        });

        return;
    }

    let tier = await TierRepository.create(data);
    res.json(tier);
}

let activate = async (req, res) => {
    let data = { ...req.body };
    let tier = await TierRepository.activate(data.id);
    res.json(tier);
}

let remove = async (req, res) => {
    let id = req.params.id;
    let tier = await TierRepository.remove(id);

    res.json(tier);
}

module.exports = { get, getById, getByPageId, post, activate, remove };