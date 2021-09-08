import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { GoogleLogin } from "react-google-login"
import { useHistory } from "react-router-dom"
import { signIn, signUp } from "../../actions/auth";
import Icon from "./icon"
import "./styles.css";

const Auth = () => {
    const innitialFormData = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

    const [isSingUp, setIsSingUp] = useState(false);
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(innitialFormData);

    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (isSingUp) {
            const status = await dispatch(signUp(formData, history));
            if(status){
                setMessage(status.message);
                setShowMessage(true);
            }
        }
        else {
            const status = await dispatch(signIn(formData, history));
            if(status){
                setMessage(status.message);
                setShowMessage(true);
            }
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleShowPassword = () => setShowPassword(!showPassword);

    const switchMode = () => {
        setShowMessage(false);
        setIsSingUp(!isSingUp);
        setShowPassword(false);
        setFormData(innitialFormData);
    }

    const googleSuccess = async (res) => {
        // const res = res.profileObj; //! this will give error when res is not there, as cannot get property profileObj of undefined
        const result = res?.profileObj; //! This (optional chaining operator) will check if res is undefined and will store undefined in result if it is not present and wont give any error
        const token = res?.tokenId;
        try {
            dispatch({ type: "AUTH", data: { result, token } });
            history.push("/")
        } catch (error) {
            console.log(error);
        }
    }
    const googleFailure = () => {
        console.log("There was an error in Goggle Login");
    }

    return (
        <>
            <form className="form-div" onSubmit={handleSubmit}>

                {isSingUp
                    ? <h2 className="heading"><img alt="SignUp" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNDgiIGhlaWdodD0iNDgiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIHRyYW5zZm9ybT0iIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMCwxNzJ2LTE3MmgxNzJ2MTcyeiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxnPjxjaXJjbGUgY3g9IjI0IiBjeT0iMjQiIHRyYW5zZm9ybT0ic2NhbGUoMy41ODMzMywzLjU4MzMzKSIgcj0iMjAiIGZpbGw9IiNmZmNhMjgiPjwvY2lyY2xlPjxwYXRoIGQ9Ik04OS41ODMzMywxMTEuMDgzMzN2LTEyLjMxMjMzYzAsLTUuOTU5MDggLTExLjkzNjA4LC05LjE4NzY3IC0xNy45MTY2NywtOS4xODc2N2MtNS45ODA1OCwwIC0xNy45MTY2NywzLjIyODU4IC0xNy45MTY2Nyw5LjE4NzY3djEyLjMxMjMzeiIgZmlsbD0iI2ZmZmZmZiI+PC9wYXRoPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHRyYW5zZm9ybT0ic2NhbGUoMy41ODMzMywzLjU4MzMzKSIgcj0iMyIgZmlsbD0iI2ZmZmZmZiI+PC9jaXJjbGU+PHBhdGggZD0iTTExOC4yNSw5OC43NTY2N3YxMi4zMjY2N2gtMjEuNXYtMTIuMzI2NjdjMCwtMy4zMzI1IC0xLjI5LC02LjA1NTgzIC0zLjI5NjY3LC04LjI0MTY3YzIuNTA4MzMsLTAuNjA5MTcgNC45ODA4MywtMC45MzE2NyA2Ljg4LC0wLjkzMTY3YzUuOTg0MTcsMCAxNy45MTY2NywzLjIyNSAxNy45MTY2Nyw5LjE3MzMzeiIgZmlsbD0iI2ZmZmZmZiI+PC9wYXRoPjxjaXJjbGUgY3g9IjI4IiBjeT0iMjAiIHRyYW5zZm9ybT0ic2NhbGUoMy41ODMzMywzLjU4MzMzKSIgcj0iMyIgZmlsbD0iI2ZmZmZmZiI+PC9jaXJjbGU+PC9nPjwvZz48L2c+PC9zdmc+" /> </h2>
                    : <h2 className="heading"><img src="https://img.icons8.com/fluent/48/000000/login-rounded-right.png" alt = "Login" /></h2>
                }
                {isSingUp
                    ? <h3 className="heading" style={{ marginBottom: "20px" }}>Sign Up</h3>
                    : <h3 className="heading" style={{ marginBottom: "20px" }}>Sign In</h3>
                }
                {showMessage 
                ? <div style = {{color:'red', textAlign:'center'}} >{message}</div>
                : <div></div>
                }

                {isSingUp && (
                    <div className="row mt-2">
                        <div className="col">
                            <input type="text" name="firstName"
                                onChange={handleChange}
                                className="form-control"
                                placeholder="First name" aria-label="First name" />
                        </div>
                        <div className="col">
                            <input type="text" name="lastName"
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Last name"
                                ria-label="Last name" />
                        </div>
                    </div>
                )
                }

                <div className="mb-3">
                    <label className="form-label"></label>
                    <input type="email" name="email"
                        onChange={handleChange}
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Email address" />
                </div>

                <div className="mb-3" style = {{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <input type={showPassword ? "text" : "password"} name="password"
                            onChange={handleChange}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Password" />
                        <div className ="addon">
                            <i className ={showPassword ? "fa fa-eye" : "fa fa-eye-slash"} onClick = {handleShowPassword} aria-hidden="true"></i>
                        </div>
                </div>

                {isSingUp && (<div className="mb-3">
                    <input type="password" name="confirmPassword"
                        onChange={handleChange}
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Confirm Password" />
                </div>)
                }

                <div className="d-grid gap-2">
                    <button className="btn btn-primary" type="submit" >
                        {isSingUp
                            ? "Sign Up"
                            : "Sign In"
                        }
                    </button>


                    <GoogleLogin
                        clientId="534758021354-tvrbkb4d1m0ek4agmvetb2dr4ggdveef.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <button className="btn btn-outline-danger google-btn" onClick={renderProps.onClick} type="button">
                                <Icon /> &nbsp; Google Sign In
                            </button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />

                </div>

                <button className="btn btn-sm btn-outline-secondary question-btn" type="button" onClick={switchMode}>
                    {isSingUp
                        ? "Already have an account? Sign In"
                        : "Don't have an account? Sign Up"
                    }
                </button>
            </form>
        </>
    )
}
export default Auth;