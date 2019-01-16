import React from 'react';
import PostsBox from './PostsBox';

function Newest(props) {
    return (
        <PostsBox fetchFor='getNewestPosts' />
    )
}

export default Newest;

