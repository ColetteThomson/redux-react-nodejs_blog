import { combineReducers } from 'redux';
import { CREATE_POST, EDIT_POST, SET_FILTER } from "./actionTypes";

export function postsReducer (state = [], action) {
    switch (action.type) {
        case CREATE_POST: {
            /* pull everything but 'type' into a post object, using rest operator */
            const {type, ...post } = action
            /* insert 'post' object into array and return new state, using spread operator */
            return [ ...state, post ]
        }
        case EDIT_POST: {
            const { type, id, ...newPost } = action
            /* returns original post object, except for one element that matches 'index' */
            return state.map((oldPost, index) =>
                action.id === index
                    /* overwrite old.. with new.. if index is matched - else return original post */
                    ? { ...oldPost, ...newPost }
                    : oldPost
            )
        }
        default:
            return state
    }
}

function filterReducer ( state = 'all', action ) {
    if (action.type === SET_FILTER) {
        return action.filter
    } else {
        return state
    }
}

const appReducer = combineReducers({
    posts: postsReducer,
    filter: filterReducer,
})

export default appReducer