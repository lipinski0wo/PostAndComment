import React from 'react';
import PostsBox from './PostsBox';

function Best(props) {
    return (
        <PostsBox fetchFor='getBestPosts' />
    )
}

export default Best;

