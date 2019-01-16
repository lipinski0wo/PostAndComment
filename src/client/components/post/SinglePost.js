import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Spinner from '../layout/Spinner';
import AddComment from './AddComment';
import Comment from './Comment';
import Head from './Head';


export class SinglePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: null,
            isFetching: false,
            postRemoved: false
        };
    }


    getDataById = async (id) => {
        const result = await axios.post('/api/post/getPostById', { id });
        return result
    }

    getRandomColor = () => {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    deleteComment = id => {
        if (this.state.isFetching) return;
        this.setState({ isFetching: true });

        axios
            .post('/api/post/removeComment', { postId: this.state.post._id, commentId: id })
            .then(data => {

                if (data.data.type === 'comment removed') {
                    const post = { ...this.state.post, comments: this.state.post.comments.filter(com => com._id !== id) };
                    this.setState({ isFetching: false, post })
                }
            })
            .catch(err => {
                console.log('error')
            })
    }

    componentDidMount() {
        if (this.props.postId) {
            this.setState({ isFetching: true })
            this.getDataById(this.props.postId)
                .then(data => {
                    this.setState({ post: data.data.payload, isFetching: false });
                })
                .catch(err => {
                    console.log('error')
                });
        } else {
            this.setState({ post: this.props.post })
        }

        this.setState({ bg: this.getRandomColor() })

    }

    addComment = (text, clear, error) => {
        if (!this.state.post) return;

        this.setState({ isFetching: true });
        axios
            .post('/api/post/addComment', { id: this.state.post._id, text })
            .then(data => {
                if (data.data.type === 'comment added') {
                    const comments = [...this.state.post.comments];
                    const comment = data.data.payload.newComment;
                    comment.user = data.data.payload.user;
                    comments.push(comment);

                    const allComments = this.state.post.allComments + 1;

                    this.setState({ isFetching: false, post: { ...this.state.post, comments, allComments } });
                    clear && clear();
                } else {
                    error && error(data.data.type);
                }
            })
            .catch(err => {
                console.log('error');
                error && error('internal error');

            });

    }
    render() {
        if (this.state.postRemoved) {
            return null;
        }

        if (!this.state.post) {
            return (
                <div className="SinglePost">
                    <Spinner />
                </div>
            )
        }
        const { comments, allComments, allLikes, text, title, user, date, _id } = this.state.post;
        const headParams = { allComments, allLikes, text, title, user, date, bg: this.state.bg, _id, removePost: this.props.removePost };
        const { isAuthorized } = this.props;
        return (
            <React.Fragment>
                <Link to={"/post/" + _id}>
                    <Head {...headParams} />
                </Link>
                <span className="postBoxHeader">{title}</span>
                <p className="postBoxParagraph">{text}</p>

                <div className="comments">
                    {!comments.length ?
                        <div className="NoComments"> No comments yet </div> :
                        comments.map(comment => (<Comment key={comment._id} {...comment} deleteComment={this.deleteComment} />))
                    }
                </div>
                {isAuthorized && <AddComment addComment={this.addComment} />}
            </React.Fragment>

        )
    }
}

Comment.defaultProps = {
    isAuthorized: false,
    date: '',
    title: '',
    text: '',
    _id: '',
    allLikes: 0,
    allComments: 0,
    user: {},
};

Comment.propTypes = {
    isAuthorized: PropTypes.bool.isRequired,
    date: PropTypes.string,
    text: PropTypes.string,
    _id: PropTypes.string,
    title: PropTypes.string,
    allLikes: PropTypes.number,
    allComments: PropTypes.number,
    user: PropTypes.object,
};

const mapStateToProps = (state) => ({
    isAuthorized: state.user.isAuthorized,
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);