import React, { useEffect } from 'react';
import { Typography, Divider, CircularProgress, Paper } from '@material-ui/core';
import moment from "moment";
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getPost, getPostBySearch } from '../../actions/posts';
import useStyles from './styles';
import CommentSection from './CommentSection';


const PostDetails = () => {

    const { post, posts, isLoading } = useSelector(state => state.posts);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const { id } = useParams();

    //When the id of the Post in URL as we have used the useParams Changes then render the new post.
    useEffect(() => {
        dispatch(getPost(id))
    }, [id])

    //When the post changes then render the post by search
    useEffect(() => {
        if (post) {
            const search = '';
            dispatch(getPostBySearch({ search, tags: post?.tags.join(',') }));
        }
    }, [post]);



    if (!post)
        return null;

    if (isLoading) {
        return (
            <Paper elevation={6} className={classes.loadingPaper}>
                <CircularProgress size="7em" />
            </Paper>
        );
    }

    //Posts here now contains the post by Search from reducers, as we have run the above useEffect.
    const recommendedPosts = posts.filter(({ _id }) => _id !== post?._id);
    const openPost = (_id) => history.push(`/posts/${_id}`);



    return (
        <Paper style={{ padding: "20px", borderRadius: "15px", marginTop: "12px" }} elevation={6}>
            <div className={classes.card}>
                <div className={classes.section}>
                    <Typography variant="h3" component="h2">{post.title}</Typography>
                    <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                    <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
                    <Typography variant="h6">Created by: {post.name}</Typography>
                    <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    <CommentSection post={post}/>
                    <Divider style={{ margin: '20px 0' }} />
                </div>
                <div className={classes.imageSection}>
                    <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
                </div>
            </div>
            {recommendedPosts.length? (
                <div className={classes.section}>
                    <Typography gutterBottom variant="h5">You might also like:</Typography>
                    <Divider />
                    <div className={classes.recommendedPosts}>
                        {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
                            <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                                <Typography gutterBottom variant="h6">{title}</Typography>
                                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                                <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                                <img src={selectedFile} width="200px" />
                            </div>
                        ))}
                    </div>
                </div>
            )
            : (
                <div className={classes.section}>
                    <Typography gutterBottom variant="h5">No Recommended Posts</Typography>
                    <Divider />
                </div>
            )
            }
        </Paper>
    )
}

export default PostDetails
