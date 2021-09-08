import React, { useState, useEffect } from 'react'
import FileBase from "react-file-base64";
import { useDispatch } from 'react-redux';
import { createPost, updatePost } from "../../actions/posts"
import { useSelector } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import "./styles.css"

const Form = ({ setCurrentId, currentId }) => {
    const dispatch = useDispatch()
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'));

    const [postData, setPostData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    })

    //? find(function) returns the element which satisfies this function.
    const post_to_be_editted = useSelector(state => currentId ? state.posts.posts?.find((p) => p._id === currentId) : null);
    useEffect(() => {
        if (post_to_be_editted)
            setPostData(post_to_be_editted);
    }, [post_to_be_editted]);


    const clear = () => {
        setCurrentId(0);
        setPostData({
            title: '',
            message: '',
            tags: '',
            selectedFile: ''
        })
    }
    const handleSubmit = (e) => {

        e.preventDefault();
        if (currentId) {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
        }
        else {
            dispatch(createPost({ ...postData, name: user?.result?.name }, history))
        }
        clear();
    }

    return (
        <div className="sticky-top" style={{ padding: "2px" }}>
            {!user?.result?.name
                ? (
                    <div className="card" style={{ width: "21rem", margin: "15px", padding: "15px" }}>
                        <div className="card-body">
                            <h5 className="card-title">Make Memories</h5>
                            <p className="card-text">You need to login first to make your own memories and look other's</p>
                            <Link to="/auth" className="link-tag">
                                <button className="btn btn-sm btn-primary">Sign In</button>
                            </Link>
                        </div>
                    </div>
                )
                : (
                    <div className="card" style={{ width: "21rem", margin: "15px", padding: "15px" }}>
                        <h4 className={currentId ? "edit-mode" : "new-mode"}> {currentId ? "Edit " : "New "}Post </h4>
                        <form onSubmit={handleSubmit} >
                            <div className="mb-3">
                                <input type="text" name="title"
                                    value={postData.title}
                                    onChange={(e) => { setPostData({ ...postData, title: e.target.value }) }}
                                    className="form-control" id="exampleInputEmail1" placeholder="Title" />
                            </div>
                            <div className="mb-3">
                                <input type="text" name="message"
                                    value={postData.message}
                                    onChange={(e) => { setPostData({ ...postData, message: e.target.value }) }}
                                    className="form-control" id="exampleInputEmail1" placeholder="Message" />
                            </div>
                            <div className="mb-3">
                                <input type="text" name="tags"
                                    value={postData.tags}
                                    onChange={(e) => { setPostData({ ...postData, tags: e.target.value.split(',') }) }}
                                    className="form-control" id="exampleInputEmail1" placeholder="Tag" />
                            </div>
                            <div className="mb-3">
                                <FileBase
                                    type="file"
                                    multiple={false}
                                    onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}

                                />
                            </div>
                            <div className="d-grid gap-2">
                                <button className="btn btn-primary" type="submit">Submit</button>
                                <button className="btn btn-danger" onClick={clear} type="button">Clear</button>
                            </div>
                        </form>

                    </div>
                )
            }
        </div>
    )
}

export default Form;


