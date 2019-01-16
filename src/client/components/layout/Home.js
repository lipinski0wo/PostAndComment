import React from 'react';
import PostsBox from './PostsBox';

function Home(props) {
    return (
        <PostsBox fetchFor='getNewestPosts' />
    )
}


export default Home;

