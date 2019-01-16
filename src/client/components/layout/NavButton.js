import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function NavButton(props) {
    const { name, to } = props;

    return (
        <div>
            <Link to={to}>
                <button>{name}</button>
            </Link>
        </div>
    )
}

NavButton.defaultProps = {
    name: '',
    to: '/'
};

NavButton.propTypes = {
    name: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired
};

export default NavButton;
