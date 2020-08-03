const { base64_encode } = require('../utils');
const PageRepository = require("../repositories/PageRepository");

let get = async (req, res) => {
    let pages = await PageRepository.get();
    res.json(pages);
}

let getById = async (req, res) => {
    let id = req.params.id;

    let page = await PageRepository.findById(id);
    res.json(page);
}

let post = async (req, res, next) => {
    try {
        let data = { ...req.body };

        data.avatar = base64_encode(req.files.avatar);
        data.banner = base64_encode(req.files.banner);

        let page = await PageRepository.create(data);
        res.json(page);
    } catch (e) {
        next(e);
    }
}

let remove = async (req, res) => {
    let id = req.params.id;

    let page = await PageRepository.remove(id);
    res.json(page);
}

module.exports = { get, getById, post, remove };