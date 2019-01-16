import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const AuthorizedRoute = ({ component: Component, isAuthorized, ...rest }) => {
    return (
        <Route {...rest} render={props => {
            return isAuthorized ? <Component {...props} /> : <Redirect to="/" />
        }} />
    )
};

AuthorizedRoute.propTypes = {
    isAuthorized: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    isAuthorized: state.user.isAuthorized
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizedRoute);
