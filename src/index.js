import { createPost, editPost, setFilter } from './actions'
import appReducer from './reducers'

console.log(createPost('dan', 'new post'))

// testing out the full reducer:

// initialize reducers by passing an undefined state
let state = appReducer(undefined, {type: 'INIT_ACTION'})
// should return: posts: []; filter: all
console.log('initial state:', state)

// should return user: dan; text: test; filter: all
state = appReducer(state, createPost('dan', 'test'))
console.log('state after createPost:', state)

// edits only first post (index 0)
// should return user: dan; text: edited post; filter: all
state = appReducer(state, editPost(0, 'edited post'))
console.log('state after editPost:', state)

// sets the filter
// should return all posts with user; text; filter: none
state = appReducer(state, setFilter('none'))
console.log('state after setFilter:', state)