import validator from 'validator';

import isEmpty from './isEmpty';

export default ({ username, email, password1, password2 }) => {
    const errors = {};

    if (isEmpty(username)) errors.username = 'username is required';
    if (isEmpty(email)) errors.email = 'email is required';
    if (isEmpty(password1)) errors.password1 = 'password is required';

    if (password1 !== password2) errors.password2 = 'passwords does not match'

    if (!errors.username && !validator.isLength(username, { min: 3, max: 120 })) errors.username = 'username should be between 3 and 120 characters long';
    if (!errors.email && !validator.isEmail(email)) errors.email = 'email is invalid';
    if (!errors.password1 && !validator.isLength(password1, { min: 3, max: 60 })) errors.password1 = 'password should be between 3 and 60 characters long';

    if (isEmpty(errors)) return false;
    else return errors;
};