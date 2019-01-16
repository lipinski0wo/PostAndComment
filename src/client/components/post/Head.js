import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

export class Head extends Component {
    deletePost = (evt) => {
        evt.preventDefault();
        this.props.removePost(this.props._id);
        this.props.history.push('/')
    }

    render() {
        const { text, title, allLikes, allComments, user, date, bg, currentUserId } = this.props;
        const { avatar, username, _id } = user || {};
        return (
            <div className="postBoxHead">
                <img src={avatar} />
                <span>{username}</span>
                <span>comments: {allComments}</span>
                <span>likes: {allLikes}</span>
                {currentUserId === _id && <span onClick={this.deletePost}>delete</span>}
            </div>
        )
    }
}

Comment.defaultProps = {
    currentUserId: '',
    date: '',
    title: '',
    text: '',
    allLikes: 0,
    allComments: 0,
    user: {},
};

Comment.propTypes = {
    currentUserId: PropTypes.string.isRequired,
    date: PropTypes.string,
    text: PropTypes.string,
    title: PropTypes.string,
    allLikes: PropTypes.number,
    allComments: PropTypes.number,
    user: PropTypes.object,
};

const mapStateToProps = (state) => ({
    currentUserId: state.user.userData.id
})

const mapDispatchToProps = {

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Head))
