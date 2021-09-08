import { AUTH, LOGOUT } from "../constants/actionTypes";

const reducer = (state = {authData: null}, action) =>{
    switch (action.type) {

        //? Irrespective od auth type ( custom / google) here we are just setting the local storage with the data we received for authentication
        case AUTH:
            localStorage.setItem("profile", JSON.stringify(action?.data));
            return {...state, authData: action?.data};

        case LOGOUT:
            localStorage.clear();
            return {...state, authData:null}
        default:
            return state;
    }
}
export default reducer;