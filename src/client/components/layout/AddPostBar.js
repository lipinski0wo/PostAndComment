import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export class AddPostBar extends Component {


    render() {
        const { isAuthorized, showPopup } = this.props;
        return (
            <div className="AddPostBar">
                {!isAuthorized ?
                    <div onClick={showPopup}>Log in to post </div> :
                    <Link to="/addPost">
                        <div >
                            Add POST
                    </div>
                    </Link>
                }
            </div>
        )
    }
}

AddPostBar.defaultProps = {
    isAuthorized: false,
    showPopup: () => { }
};

AddPostBar.propTypes = {
    isAuthorized: PropTypes.bool.isRequired,
    showPopup: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    isAuthorized: state.user.isAuthorized
});

const mapDispatchToProps = dispatch => ({
    showPopup: action => dispatch({ type: '_TOGGLE_POPUP', payload: 'show' })
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPostBar);
