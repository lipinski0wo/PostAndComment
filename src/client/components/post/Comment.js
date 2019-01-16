import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import axios from 'axios';

export class Comment extends Component {

    deleteComment = () => {
        this.props.deleteComment(this.props._id)
    }
    talkToUser = () => {
        let id = this.props && this.props.user && this.props.user._id;
        if (id) {
            this.props.openTalkie(id);
        }
    }
    render() {
        const { date, likes, text, user, _id, currentUserId } = this.props;
        const { username, avatar, _id: userId } = user;

        return (
            <div className="comment">
                <div className="commentHead">
                    <img src={avatar} />
                    <span>{username}</span>
                    <span>Likes: {likes.length}</span>
                    {currentUserId == userId && <span onClick={this.deleteComment}>delete</span>}
                </div>
                <p className="commentBody">{text}</p>
            </div>
        )
    }
}

Comment.defaultProps = {
    currentUserId: '',
    isAuthorized: false,
    date: '',
    likes: [],
    _id: '',
    openTalkie: () => { }
};

Comment.propTypes = {
    currentUserId: PropTypes.string.isRequired,
    isAuthorized: PropTypes.bool.isRequired,
    openTalkie: PropTypes.func.isRequired,
    date: PropTypes.string,
    likes: PropTypes.array,
    _id: PropTypes.string,
};

const mapStateToProps = (state) => ({
    isAuthorized: state.user.isAuthorized,
    currentUserId: state.user.userData.id
})

const mapDispatchToProps = dispatch => ({
    openTalkie: (id) => dispatch({ type: 'OPEN_TALKIE', payload: id })
})

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
