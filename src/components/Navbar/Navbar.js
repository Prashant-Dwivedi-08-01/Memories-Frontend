import React, { useState, useEffect } from 'react';
import memories from "../../images/memories.png";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import "./styles.css";

const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch()

    const logout = () => {
        dispatch({ type: "LOGOUT" });
        history.push('/');
        setUser(null);
    }

    useEffect(() => {
        const token = user?.token;
        if(token){
            const decodedToken = decode(token);
            if(decodedToken.exp * 1000 < new Date().getTime())
                logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="nav-image-div">
                    <img id="navbarImage" src={memories} alt="" />
                    <Link to="/" className="link-tag"><h1>Memories</h1></Link>
                </div>
                {user
                    ? (
                        <div className="user-detail">
                            {user.result.imageUrl
                                ? <img src={user?.result.imageUrl} className="profile-image" />
                                : <img src="https://img.icons8.com/color/96/000000/name--v1.png" className="profile-image" />
                            }

                            <span>{user?.result.name}</span>
                            <button className="btn btn-sm btn-danger" onClick={logout}>LOGOUT</button>
                        </div>
                    )
                    : <Link to="/auth" className="link-tag">
                        <button className="btn btn-sm btn-success auth-toggle-btn" type = "button">LOGIN</button>
                    </Link>
                }
            </nav>
        </>
    )
}
export default Navbar;