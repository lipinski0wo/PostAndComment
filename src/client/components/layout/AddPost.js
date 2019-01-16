import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import '../../styles/CreatePost.scss';

class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            text: '',
            errors: {},
            showErrors: { title: true, text: true }
        };
    }
    onChange = evt => {
        this.setState({ [evt.target.name]: evt.target.value, showErrors: { ...this.state.showErrors, [evt.target.name]: false } });
    }
    onSubmit = evt => {
        evt.preventDefault();
        if (this.props.isFetching) return;

        this.setState({ errors: {}, showErrors: { title: true, text: true } });
        this.props.createPost({ title: this.state.title, text: this.state.text });
    }

    componentDidUpdate(oldProps) {
        if (this.props.type === 'post success') {
            this.props.clearPostSuccess();
            this.props.history.push('/post/' + this.props.createdPostId);
        }
        if (this.props.errors.title === this.state.errors.title) return;
        if (this.props.errors.text === this.state.errors.text) return;
        this.setState({ errors: this.props.errors, showErrors: { title: true, text: true } });

    }

    render() {
        const { title, text, errors, showErrors } = this.state;
        return (
            <div className="CreatePost">
                <div className="container">

                    <h2>Create new post</h2>
                    <h3>Title</h3>
                    <input type="text" name="title" value={title} onChange={this.onChange} />
                    <span className="errorMsg">{showErrors.title && errors.title || ''}</span>
                    <h3>Text</h3>
                    <textarea name="text" value={text} onChange={this.onChange}></textarea>
                    <span className="errorMsg">{showErrors.text && errors.text || ''}</span>

                    <input type="submit" onClick={this.onSubmit} value="add post" />
                </div>
            </div>
        )
    }
}
CreatePost.defaultProps = {
    isFetching: false,
    errors: {},
    createdPostId: false,
};

CreatePost.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    errors: PropTypes.object.isRequired,
    createdPostId: PropTypes.string
}

const mapStateToProps = state => ({
    isFetching: state.post.isFetching,
    errors: state.post.addPostErrors,
    type: state.post.type,
    createdPostId: state.post.createdPostId
});

const mapDispatchToProps = dispatch => ({
    createPost: (payload) => dispatch({ type: 'ADD_POST', payload }),
    clearPostSuccess: () => dispatch({ type: '_CLEAR_POST_SUCCESS', payload: {} })
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreatePost));