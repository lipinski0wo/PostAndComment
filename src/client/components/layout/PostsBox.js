import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from './Spinner';
import axios from 'axios';
import SinglePost from '../post/SinglePost';

import '../../styles/PostsBox.scss';

export class Newest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            isFetching: true,

        };
    }
    removePost = (id) => {
        this.setState({ posts: this.state.posts.filter(post => post._id !== id) })
        const result = axios.post('/api/post/removePost', { postId: id }).then(data => {
        })
    }

    getNewestPosts = async (quantity, from) => {
        const result = await axios.post('/api/post/' + this.props.fetchFor, { quantity, from });
        return result
    }
    addMorePosts = () => {
        if (this.state.isFetching) return;
        this.setState({ isFetching: true });
        this.getNewestPosts(2, this.state.posts.length + 1)
            .then(data => {
                this.setState({ posts: [...this.state.posts, ...data.data.payload], isFetching: false });
            })
            .catch(err => {
                console.log('error')
            });
    }

    componentDidMount() {
        this.getNewestPosts(2, 0)
            .then(data => {
                this.setState({ posts: data.data.payload, isFetching: false });
            })
            .catch(err => {
                console.log('error')
            });
    }

    newestContent = () => {
        const { isFetching, posts } = this.state;

        if (posts.length === 0) {
            return (
                <span className="noPosts">. . . .</span>
            )
        }
        return posts.map(post => (
            <div className="postBox" key={post._id}>
                <SinglePost post={post} removePost={this.removePost} />
            </div>
        ));
    }

    render() {
        const { isFetching } = this.state;
        return (
            <div className="postsBox">
                {this.newestContent()}
                <div className="postsLoading">
                    {isFetching && <Spinner />}
                </div>
                <button onClick={this.addMorePosts} className="postsLoadMore">load more content</button>
            </div>
        )
    }
}

export default connect(null, {})(Newest);
