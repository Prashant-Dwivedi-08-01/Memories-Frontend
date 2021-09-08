import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index.js";

export const signIn = (formData, history) => async(dispatch) =>{
    try {
        const { data } = await api.signIn(formData);
        /*
            ? What we get in data?
            ? --> res.status(200).json({ result: existingUser, token }); //from controllers 
            ? thus we get json web token made in controllers and existing userdetails
        */
       console.log(data);
        const action = {
            type: AUTH,
            data
        }
        dispatch(action);
        history.push('/');   
    } catch (error) {
        console.log(error.message);
        return {message: "Invalid Username of Password"};
    }
}

export const signUp = (formData, history) => async(dispatch) =>{
    try{
        const { data } = await api.signUp(formData);
        if(data.flag === 1){
            return data;
        }
        const action = {
            type: AUTH,
            data
        }
        dispatch(action);
        history.push('/');
    }catch(error){
        console.log(error);
        return {message: "User already exits"};
    }
}