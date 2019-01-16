import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import logoSrc from '../../img/small_logo.png';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: {}
        }
    }
    onSubmitRegister = evt => {
        evt.preventDefault();
        if (!this.props.canAnimate) return;
        if (this.props.isFetching) return;
        this.props.registerUser();
    }
    onChangeInput = evt => {
        this.props.updateInput(evt.target.name, evt.target.value);
        this.props.eraseError(evt.target.name);
    }
    onClickShowLogin = evt => {
        if (!this.props.canAnimate) return;
        this.props.showLogin();
    }

    successRegister = () => {
        if (this.props.success) {
            this.props.showLogin();
        }
    }
    render() {
        const { inputs, errors } = this.props;

        this.successRegister();

        return (
            <React.Fragment >
                <span>Register</span>
                <form onSubmit={this.onSubmitRegister}>
                    <input type="text" placeholder="username" name="username" onChange={this.onChangeInput} value={inputs.username} />
                    <span>{errors.username || '.'}</span>
                    <input type="text" placeholder="email" name="email" onChange={this.onChangeInput} value={inputs.email} />
                    <span>{errors.email || '.'}</span>
                    <input type="text" placeholder="password" name="password1" onChange={this.onChangeInput} value={inputs.password1} />
                    <span>{errors.password1 || '.'}</span>
                    <input type="text" placeholder="repeat password" name="password2" onChange={this.onChangeInput} value={inputs.password2} />
                    <span>{errors.password2 || '.'}</span>

                    <input type="submit" value="register" name="submit" />

                </form>
                <span>reset password</span>
                <span onClick={this.onClickShowLogin}>already have an account? log in!</span>

            </React.Fragment>
        )
    }
}

Register.defaultProps = {
    canAnimate: false,
    inputs: {},
    errors: {},
    showLogin: () => { },
    updateInput: () => { },
    eraseError: () => { },
    registerUser: () => { },
};

Register.propTypes = {
    canAnimate: PropTypes.bool.isRequired,
    inputs: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    showLogin: PropTypes.func.isRequired,
    updateInput: PropTypes.func.isRequired,
    eraseError: PropTypes.func.isRequired,
    registerUser: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
    canAnimate: state.layout.canAnimate,
    inputs: state.user.register.inputs,
    errors: state.user.register.errors,
    success: state.user.register.success
});

const mapDispatchToProps = dispatch => ({
    showLogin: () => dispatch({ type: 'TOGGLE_LOGIN_REGISTER', payload: 'login' }),
    updateInput: (name, value) => dispatch({ type: '_UPDATE_REGISTER_INPUT', payload: { name, value } }),
    eraseError: (name) => dispatch({ type: '_ERASE_REGISTER_ERROR', payload: { name } }),
    registerUser: () => dispatch({ type: 'REGISTER_USER', payload: {} }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
