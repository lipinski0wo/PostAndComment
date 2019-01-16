import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class AddComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            isFetching: false,
            error: false
        };
    }
    clearSpace = () => {
        this.setState({ text: '', isFetching: false, error: null });
    }
    onFeedbackError = info => {
        this.setState({ error: info, isFetching: false })
    }
    onSubmit = () => {
        if (this.state.isFetching) return;
        this.setState({ isFetching: true });
        this.props.addComment(this.state.text, this.clearSpace, this.onFeedbackError);
    }
    onChange = evt => {
        this.setState({ text: evt.target.value, error: null });
    }

    render() {
        return (
            <div className="AddComment">
                <textarea style={{ borderColor: this.state.error ? 'red' : null }} placeholder="Add comment" onChange={this.onChange} value={this.state.text} ></textarea>
                <input type="submit" value="send" onClick={this.onSubmit} style={{ backgroundColor: this.state.isFetching ? 'red' : null }} />
            </div>
        )
    }
}

AddComment.defaultProps = {
    addComment: () => { }
};

AddComment.propTypes = {
    addComment: PropTypes.func.isRequired,
};

export default connect(null, {})(AddComment)
