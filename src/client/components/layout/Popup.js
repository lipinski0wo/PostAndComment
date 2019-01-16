import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import '../../styles/Popup.scss';

import Account from '../user/Account';
import Login from '../user/Login';
import Register from '../user/Register';

class Popup extends Component {

    onClickHidePopup = evt => {
        if (!this.props.canAnimate) return;
        if (evt.target.className.indexOf('popup') === -1) return;
        this.props.hidePopup();
    }

    popupContent = () => {
        const { isAuthorized, isShowingLogin, isFetching } = this.props;

        if (isAuthorized) return (<Account />)

        return (
            <div className="log_reg">
                {isShowingLogin ? <Login /> : <Register />}
            </div>
        )
    }

    render() {
        const { isPopupVisible } = this.props;
        if (!isPopupVisible) return null;

        return (
            <div className="popup" onClick={this.onClickHidePopup}>
                {this.popupContent()}
                sdf
            </div>
        )
    }
}

Popup.defaultProps = {
    isPopupVisible: false,
    isShowingLogin: true,
    isAuthorized: false,
    canAnimate: true,
    isFetching: false,
    hidePopup: () => { }
};

Popup.propTypes = {
    isPopupVisible: PropTypes.bool.isRequired,
    isShowingLogin: PropTypes.bool.isRequired,
    canAnimate: PropTypes.bool.isRequired,
    isAuthorized: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    hidePopup: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    isPopupVisible: state.layout.isPopupVisible,
    canAnimate: state.layout.canAnimate,
    isAuthorized: state.user.isAuthorized,
    isShowingLogin: state.layout.isShowingLogin,
    isFetching: state.user.isFetching,
});

const mapDispatchToProps = dispatch => ({
    hidePopup: () => dispatch({ type: 'TOGGLE_POPUP', payload: 'hide' })
});

export default connect(mapStateToProps, mapDispatchToProps)(Popup);