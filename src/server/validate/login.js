import validator from 'validator';

import isEmpty from './isEmpty';

export default ({ email, password }) => {
    const errors = {};
    if (isEmpty(email)) errors.email = 'email is required';
    if (isEmpty(password)) errors.password = 'password is required';

    if (!errors.email && !validator.isEmail(email)) errors.email = 'email is invalid';
    if (!errors.password && !validator.isLength(password, { min: 3, max: 60 })) errors.password = 'incorrect password';

    if (isEmpty(errors)) return false;
    else return errors;
}