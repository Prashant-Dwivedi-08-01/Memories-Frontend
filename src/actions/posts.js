import * as api from '../api/index.js';
import { FETCH_ALL, CREATE , UPDATE, DELETE, FETCH_BY_SEARCH,START_LOADING, END_LOADING, FETCH_POST, COMMENT } from "../constants/actionTypes"

//* Action Creator
export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING})
        const { data } = await api.fetchPost(id); //? This is coming from backend server by making request from api folder
        const action = { 
            type: FETCH_POST, 
            payload: data 
        }
        dispatch(action);
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log("Error is Fetch One Post Action: ",error.message);
    }
}

export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING})
        const { data } = await api.fetchPosts(page); //? This is coming from backend server by making request from api folder
        // here data is object we sent form backend
        const action = { 
            type: FETCH_ALL, 
            payload: data 
        }
        dispatch(action);
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log("Error is Fetch All Post Action: ",error.message);
    }
}

export const getPostBySearch = (searchQuery) => async(dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
        const action = {
            type: FETCH_BY_SEARCH,
            payload: data 
        }

        dispatch(action);
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log("Error in Search Action: ", error);
    }
}

export const createPost = (post, history) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.createPost(post); //? This is coming from backend server by making request from api folder
        const action = { 
            type: CREATE, 
            payload: data 
        }

        history.push(`/posts/${data._id}`);

        dispatch(action);

    } catch (error) {
        console.log("Error in Create Post Action: ", error);
    }

}

export const updatePost = (id, updatedPost) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, updatedPost); //? This is coming from backend server by making request from api folder
        const action = { 
            type: UPDATE, 
            payload: data //?Data is the updated post
        }

        dispatch(action);

    } catch (error) {
        console.log("Error in Update Post Action: ", error);
    }

}

export const deletePost = (id) => async(dispatch)=>{
    try {
        await api.deletePost(id);
        
       const action = {
            type:DELETE,
            payload:id
        }

        dispatch(action);

    } catch (error) {
        console.log("Error in Delete Post Action: ", error);
    }
}

export const likePost = (id) => async(dispatch)=>{
    try {
        const { data } = await api.likePost(id);

        const action = {
            type:UPDATE,
            payload: data
        }

        dispatch(action);
        
    } catch (error) {
        console.log("Error in Like Post Action: ", error);
    }
}

export const commentPost = (comment, id) => async(dispatch)=>{
    try {
        const { data } = await api.comment(comment, id);
        const action = {
            type: UPDATE,
            payload: data //! data is a single updated post
        }
        
        dispatch(action);
        return data.comments; //! So that we can use this to make update to our comments array in Commentsection.jsx

    } catch (error) {
        console.log("Error in Comment Post Action: ", error);
    }
}