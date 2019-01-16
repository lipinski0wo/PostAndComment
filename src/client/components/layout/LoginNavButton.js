import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import closeSrc from '../../img/close.png';

export class LoginNavButton extends Component {
    togglePopup = () => {
        const { isPopupVisible, togglePopup } = this.props;
        togglePopup(isPopupVisible ? 'hide' : 'show');
    }
    buttonContent = () => {
        const { isPopupVisible, isAuthorized, avatar, username } = this.props;

        if (isPopupVisible) {
            return (
                <span>
                    <img src={closeSrc} alt="" />
                </span>
            )
        }

        if (!isAuthorized) {
            return 'log in'
        }


        return (
            <React.Fragment>
                <img src={avatar} alt="" />
                <span>{username}</span>
            </React.Fragment>
        )

    }
    render() {
        return (
            <div>
                <button onClick={this.togglePopup}>
                    {this.buttonContent()}
                </button>
            </div>
        )
    }
}

LoginNavButton.defaultProps = {
    isPopupVisible: false,
    isAuthorized: false,
    username: '',
    avatar: '',
    togglePopup: () => { }
};

LoginNavButton.propTypes = {
    isPopupVisible: PropTypes.bool.isRequired,
    isAuthorized: PropTypes.bool.isRequired,
    togglePopup: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
    isPopupVisible: state.layout.isPopupVisible,
    isAuthorized: state.user.isAuthorized,
    username: state.user.userData.username,
    avatar: state.user.userData.avatar,
});

const mapDispatchToProps = dispatch => ({
    togglePopup: action => dispatch({ type: '_TOGGLE_POPUP', payload: action })
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginNavButton);
