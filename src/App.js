import React from "react"
import "./style.css"
import Navbar from "./components/Navbar/Navbar"
import Home from "./components/Home/Home"
import Auth from "./components/Auth/Auth"
import PostDetails from "./components/PostDetails/PostDetails"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));

    return (

        <BrowserRouter>
            <div className="container-fluid">
                <Navbar />
                <Switch>

                    <Route path="/" exact component={() => <Redirect to="/posts" />} />
                    <Route path="/posts" exact component={Home} />
                    <Route path="/posts/search" exact component={Home} />
                    <Route path="/posts/:id" exact component={PostDetails} />
                    <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default App;