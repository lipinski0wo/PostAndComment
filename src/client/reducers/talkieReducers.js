const defaultState = {
    userId: null
};

export default (state = defaultState, { type, payload }) => {
    switch (type) {
        case 'OPEN_TALKIE':
            return {
                ...state,
                userId: payload,
                talkieUserIdTime: Date.now()
            };
        case 'CLEAR_OPEN_TALKIE':
            return {
                ...state,
                userId: null
            };
        default:
            return state;
    }
};
