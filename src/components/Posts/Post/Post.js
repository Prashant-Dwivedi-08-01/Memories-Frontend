import React from 'react'
import { useDispatch } from 'react-redux'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from "moment";
import "./styles.css";
import { deletePost, likePost } from "../../../actions/posts";
import { ButtonBase } from '@material-ui/core/';
import { useHistory } from 'react-router';
import useStyles from "./sty";

const Post = ({ post, setCurrentId }) => {

    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();

    const openPost = (e) => {
        // dispatch(getPost(post._id, history));

        history.push(`/posts/${post._id}`);
    };

    return (
        <div className="card card-post">
            <ButtonBase
                component="span"
                name="test"
                className={classes.cardAction}
                onClick={openPost}
            >
                <img src={post.selectedFile} className="card-img-top" alt="..." />
            </ButtonBase>
            <p className="tags">{post.tags.map((tag) => ` #${tag}`)}</p>
            <div className="card-body">
                <div>
                    <div className="memory-title-div">
                        <h6 className="card-title memory-title">{post.title}</h6>
                        <p className="card-title">{moment(post.createdAt).fromNow()}</p>
                    </div>

                </div>

                <div>
                    <p className="card-title creator">By, {post.name}</p>
                    {(user?.result?.googleId === post.creator || user?.result?._id === post.creator)
                        && (
                            <MoreHorizIcon fontSize="default" onClick={() => { setCurrentId(post._id) }} style={{ float: "right", cursor: "pointer" }} />
                        )}
                </div>
                {post.message.length > 90
                    ? <p className="card-text" style={{ height: "100px" }}>
                        {post.message.slice(0, 90)} ....<ButtonBase
                            component="span"
                            name="test"
                            className={classes.cardAction}
                            onClick={openPost}
                        ><b> Keep Reading</b></ButtonBase>
                    </p>
                    : <p className="card-text" style={{ height: "100px" }}> {post.message}</p>
                }


                {user ?
                    <button type="button" onClick={() => dispatch(likePost(post._id))}
                        className={((post.likes.findIndex((this_id) => this_id === (user?.result?.googleId)) === -1) &&
                            (post.likes.findIndex((this_id) => this_id === (user?.result?._id)) === -1)
                        )
                            ? "btn btn-sm btn-outline-primary"
                            : "btn btn-sm btn-primary"}>
                        <ThumbUpAltIcon fontSize="small" /> Like {post.likes.length - 1}
                    </button>
                    : <button type="button" disabled onClick={() => dispatch(likePost(post._id))} className="btn btn-sm btn-outline-primary">
                        <ThumbUpAltIcon fontSize="small" /> Like {post.likes.length - 1}
                    </button>
                }

                {(user?.result?.googleId === post.creator || user?.result?._id === post.creator)
                    && (<button type="button" style={{ float: "right" }} onClick={() => dispatch(deletePost(post._id))} className="btn btn-sm btn-outline-danger">
                        <DeleteIcon fontSize="small" /> Delete
                    </button>)}

            </div>
        </div>
    )
}

export default Post;