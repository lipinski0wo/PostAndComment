import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../../styles/NavBar.scss';

import NavButton from './NavButton';
import LoginNavButton from './LoginNavButton';

export class Navbar extends Component {
    render() {
        return (
            <nav className="navbar">
                <div className="container">
                    <NavButton name="home" to="/" />
                    <NavButton name="newest" to="/newest" />
                    <NavButton name="best" to="/best" />
                    <LoginNavButton />
                </div>
            </nav>
        )
    }
}


export default connect(null, {})(Navbar);