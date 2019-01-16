import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import logoSrc from '../../img/small_logo.png';

class Login extends Component {

    onSubmitLogin = evt => {
        evt.preventDefault();
        if (this.props.isFetching) return;
        this.props.loginUser();
    }
    onChangeInput = evt => {
        this.props.updateInput(evt.target.name, evt.target.value);
        this.props.eraseError(evt.target.name);
        if (this.props.registerSuccess) {
            this.props.clearRegisterSuccess();
        }
    }
    onClickShowRegister = evt => {
        if (!this.props.canAnimate) return;
        this.props.showRegister();
    }

    render() {
        const { inputs, errors, registerSuccess } = this.props;

        return (
            <React.Fragment>
                <span>Log in</span>

                <span>{registerSuccess ? 'you can login now' : '.'}</span>
                <form onSubmit={this.onSubmitLogin}>
                    <input type="text" placeholder="email" name="email" onChange={this.onChangeInput} value={inputs.email} />
                    <span>{errors.email || '.'}</span>
                    <input type="text" placeholder="password" name="password" onChange={this.onChangeInput} value={inputs.password} />
                    <span>{errors.password || '.'}</span>
                    <input type="submit" value="log in" name="submit" />
                </form>
                <span>reset password</span>
                <span onClick={this.onClickShowRegister}>dont have an account? register!</span>
            </React.Fragment>
        )
    }
}

Comment.defaultProps = {
    userData: true,
    inputs: {},
    errors: {},
    registerSuccess: false,
    showRegister: () => { },
    updateInput: () => { },
    eraseError: () => { },
    loginUser: () => { },
    clearRegisterSuccess: () => { },
};

Comment.propTypes = {
    userData: PropTypes.bool.isRequired,
    inputs: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    registerSuccess: PropTypes.bool.isRequired,
    showRegister: PropTypes.func.isRequired,
    updateInput: PropTypes.func.isRequired,
    eraseError: PropTypes.func.isRequired,
    loginUser: PropTypes.func.isRequired,
    clearRegisterSuccess: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    canAnimate: state.layout.canAnimate,
    inputs: state.user.login.inputs,
    errors: state.user.login.errors,
    registerSuccess: state.user.register.success
});

const mapDispatchToProps = dispatch => ({
    showRegister: () => dispatch({ type: 'TOGGLE_LOGIN_REGISTER', payload: 'register' }),
    updateInput: (name, value) => dispatch({ type: '_UPDATE_LOGIN_INPUT', payload: { name, value } }),
    eraseError: (name) => dispatch({ type: '_ERASE_LOGIN_ERROR', payload: { name } }),
    loginUser: () => dispatch({ type: 'LOGIN_USER', payload: {} }),
    clearRegisterSuccess: () => dispatch({ type: '_CLEAR_REGISTER_SUCCESS', payload: {} })
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
