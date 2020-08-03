import { combineReducers } from 'redux';
import { pages, page } from './pages';
import { tiers } from './tiers';
import { posts } from './posts';

export default combineReducers({
    pages,
    page,
    tiers,
    posts
});