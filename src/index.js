import { legacy_createStore as createStore } from 'redux';
import { createPost, editPost, setFilter } from './actions'
import appReducer from './reducers'

// use createStore function to create store from appReducer
let store = createStore(appReducer)

// initialiation steps of redux store:
// to see the initial state of the store
console.log(store.getState())
// to subscribe to changes in the store
const unsubscribe = store.subscribe(() => {
    console.log('state changed:', store.getState())
})

// rendering the user interface (NB: using REDUX only):
// define reference to <div> root in index.html
const root = document.getElementById('root')
// define render() function, which will be subscribed to the store
const render = () => {
    // clear the <div>
    root.innerHTML = ''
    // get all posts from the current state of the store    
    const { posts } = store.getState()
    // render all posts in a list
    posts.forEach((post, index) => {
        const item = document.createElement('li')
        // add a click eventListener to each post's 'text'
        item.addEventListener('click', () =>
            store.dispatch(editPost(index, post.text + '!'))
        )
        const text = document.createTextNode(post.user + ' - ' + post.text)
        item.appendChild(text)
        root.appendChild(item)
    })
}
// subscribe render() to state changes in the store
const stopRender = store.subscribe(render)


// dispatching actions using an action creator
store.dispatch(createPost('dan', 'hello world'))
store.dispatch(createPost('des', 'second post'))

// or dispatching actions using an action (not best practice)
//store.dispatch({ type: 'CREATE_POST', user: 'dan', text: 'hello world' })






// console.log(createPost('dan', 'new post'))

// testing out the full reducer:

// initialize reducers by passing an undefined state
//let state = appReducer(undefined, {type: 'INIT_ACTION'})
// should return: posts: []; filter: all
//console.log('initial state:', state)

// should return user: dan; text: test; filter: all
//state = appReducer(state, createPost('dan', 'test'))
//console.log('state after createPost:', state)

// edits only first post (index 0)
// should return user: dan; text: edited post; filter: all
//state = appReducer(state, editPost(0, 'edited post'))
//console.log('state after editPost:', state)

// sets the filter
// should return all posts with user; text; filter: none
//state = appReducer(state, setFilter('none'))
//console.log('state after setFilter:', state)