var Page = require('../models/Page');
var Repository = require('./Repository');

class PageRepository extends Repository {
    constructor(model) {
        super(model);
    }
}

var pageRepository = new PageRepository(Page);

module.exports = pageRepository;