import validator from 'validator';

import isEmpty from './isEmpty';

export default ({ title, text }) => {
    const errors = {};
    if (isEmpty(title)) errors.title = 'title is required';
    if (isEmpty(text)) errors.text = 'text is required';

    if (!errors.title && !validator.isLength(title, { min: 1 })) errors.title = 'title is required';
    if (!errors.text && !validator.isLength(text, { min: 1 })) errors.text = 'text is required';

    if (isEmpty(errors)) return false;
    else return errors;
};