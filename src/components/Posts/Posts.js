import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post/Post.js";
import "./styles.css"
import {CircularProgress} from "@material-ui/core";

const Posts = ({setCurrentId}) => {
    const { posts, isLoading } = useSelector(state => state.posts)
    if(!posts?.length && !isLoading){
        return(
            <div>
                No Posts
            </div>
        )
    }
    return (
        <div className="container col-posts">
            {
               isLoading
                ?<CircularProgress/> 
                :posts.map((post) => (
                    <Post key={post._id} post = {post} setCurrentId={setCurrentId}/>
                )) 
            }
        </div>
    )
}

export default Posts;