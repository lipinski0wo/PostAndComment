import validator from 'validator';

import isEmpty from './isEmpty';

export default ({ text }) => {
    const errors = {};
    if (isEmpty(text)) errors.text = 'text is required';

    if (!errors.text && !validator.isLength(text, { min: 1 })) errors.text = 'text is required';

    if (isEmpty(errors)) return false;
    else return errors;
};