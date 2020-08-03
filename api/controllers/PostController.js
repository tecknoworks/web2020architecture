const PostRepository = require("../repositories/PostRepository");
const PageRepository = require('../repositories/PageRepository');
const TierRepository = require('../repositories/TierRepository');

let get = async (req, res) => {
    let posts = await PostRepository.get();
    res.json(posts);
}

let getById = async (req, res) => {
    let id = req.params.id;
    let post = await PostRepository.findById(id);

    res.json(post);
}

let getByPageId = async (req, res) => {
    let id = req.params.id;
    let posts = await PostRepository.findByPage(id);
    let activeTier = await TierRepository.findActiveByPage(id);

    let amount = activeTier == null ? 0 : activeTier.amount;

    posts = posts.map((post) => {
        if (post.requiredAmount > amount) {
            return {
                blocked: true,
                _id: post._id,
                requiredAmount: post.requiredAmount
            }
        }

        return post;
    });

    res.json(posts);
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

    let post = await PostRepository.create(data);
    res.json(post);
}

let remove = async (req, res) => {
    let id = req.params.id;
    let post = await PostRepository.remove(id);

    res.json(post);
}

module.exports = { get, getById, getByPageId, post, remove };