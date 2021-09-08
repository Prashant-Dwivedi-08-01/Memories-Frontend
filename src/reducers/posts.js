//? Here the state is bascially all the posts we have

//? Jab main App.Js mein se Hum Koi Action Dispatch karte hai toh vo yaha aake check hota hai in 
//? action.type and then we set the state or change the payload
//? Yaha Par action hame Store se Mila hai!
//? Store ko action dispatch function mein mila hai!
//? Dispatc action App.js se mila hai


import { FETCH_ALL, FETCH_POST, CREATE, UPDATE, DELETE, FETCH_BY_SEARCH, START_LOADING, END_LOADING,COMMENT } from "../constants/actionTypes"
//! Now when we return anything form here, it is accessible from useSelector
const reducer = (state = { isLoading: true, posts: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };

        case END_LOADING:
            return { ...state, isLoading: false };

        case DELETE:
            return { ...state, posts: state.posts.filter(post => post._id !== action.payload) }

        case UPDATE:
            /*
            * So here we have to update the posts[] array, this arra already contains all the posts, and now we have just updates a single post and we have got that update post inside action.payload. So here we run a map function, and return an array (map function returns an array). The logic inside map function says that, if the id of any post  is equal to the id of the post inside the action.payload then it means we have found that post in posts[] array which has been updated, and once we find that we retunr that post itself viz. action.paload and in all the other cases we return the normal post which came inside the map. In this way we again get an array same as posts but with the replaced post for the one which was updated.
            */
            return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) };

        case FETCH_ALL:
            // console.log("Action Paylod Fetch all i reducers : ", action.payload);
            return {
                ...state,
                posts: action.payload.data,
                total: action.payload.toal,
                numberOfPages: action.payload.numberOfPages
            }

        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload }; //Payload contains the data of search;

        case FETCH_POST:
            return { ...state, post: action.payload };
        case CREATE:
            // console.log("Action.PayLoad : ", action.payload);
            return { ...state, posts: [...state.posts, action.payload] }; //? posts state is as array and thus we are opening it and then we are adding the new post
        default:
            return state;
    }
}

export default reducer;