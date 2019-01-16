import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Account extends Component {
    render() {
        const { username, avatar } = this.props.userData;
        const { logout } = this.props;
        return (
            <div className="account">
                <div className="head">
                    <img src={avatar} />
                    <span>{username}</span>
                </div>
                <div className="body"></div>
                <div className="foot">
                    <div>
                        <button>terms</button>
                        <button>privacy</button>
                        <button>delete me</button>
                        <button onClick={logout}>log out</button>
                    </div>
                    <span>&copy; All rights reserved.</span>
                </div>
            </div>
        )
    }
}

Comment.defaultProps = {
    userData: {},
    logout: () => { }
};

Comment.propTypes = {
    userData: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    userData: state.user.userData
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch({ type: 'LOGOUT_USER', payload: {} })
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);