var Post = require('../models/Post');
var Repository = require('./Repository');

class PostRepository extends Repository {
    constructor(model) {
        super(model);
    }

    async findByPage(pageId) {
        return await this.model.find({ page: pageId }).exec();
    }
}

var postRepository = new PostRepository(Post);

module.exports = postRepository;