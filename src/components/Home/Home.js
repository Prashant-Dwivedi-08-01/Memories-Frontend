import React, { useState } from 'react';
import Posts from "../Posts/Posts.js"
import Form from "../Forms/Form.js"
import Pagination from '../Pagination';
import { getPostBySearch } from "../../actions/posts"
import { useDispatch } from "react-redux"
import { useHistory, useLocation } from 'react-router-dom';

import { AppBar, TextField, Button, Paper} from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';
import useStyles from './sty';

function useQuery() {
    return new URLSearchParams(useLocation().search) //? Ig it takes the URL and .search() method on it returns the parameters objects passed into tbat URL for search.
}

const Home = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const query = useQuery(); //? Ig this returns the parameters object from req.query 


    const [currentId, setCurrentId] = useState(null);
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    // destructring the query objec
    const page = query.get('page') || 1; //? here, we retrieve the page info form query object. If not page then choose page 1
    // const searchQuery = query.get('searchQuery');


    // Main function to search the post in database
    const searchPost = () => {
        if (search.trim() || tags) { //trim() Remove whitespace from both sides of a string:
            dispatch(getPostBySearch({ search, tags: tags.join(',') })); //? We cant pass array in URL and thus we join entire array with commasfetchPostsBySearch

            //we are pushing to this URL so that we can provide client side routing.
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
        } else {
            history.push('/');
        }
    };

    // Handling the Search from Memories
    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPost();
        }
    };

    // Handling the search from tags
    const handleAddChip = (tag) => setTags([...tags, tag]);
    const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));


    //! every time there is a change in currentId and any new dispatch, we dispatch the getPost,to refresh     
    // useEffect(() => {
    //     dispatch(getPosts()); //? getPosts is the action from action/posts.js which we are dispathcing here.
    // }, [currentId, dispatch])

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-xl-8">
                        <Posts setCurrentId={setCurrentId} />
                    </div>
                    <div className="col-12 col-xl-4">
                        {/* //! Search */}
                        <div className="sticky-top" style={{
                            padding: '2px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}>
                            <AppBar className={classes.appBarSearch} position="static" color="inherit">
                                <TextField onKeyDown={handleKeyPress} name="search" variant="outlined"
                                    label="Search Memories" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
                                <ChipInput
                                    style={{ margin: '10px 0' }}
                                    value={tags}
                                    onAdd={(chip) => handleAddChip(chip)}
                                    onDelete={(chip) => handleDeleteChip(chip)}
                                    label="Search Tags"
                                    variant="outlined"
                                />
                                <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
                            </AppBar>

                            {/* //! Form to add new post */}
                            <Form setCurrentId={setCurrentId} currentId={currentId} />
                            <Paper className={classes.pagination} elevation={4}>
                                <Pagination page = {page}/>
                            </Paper>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Home;