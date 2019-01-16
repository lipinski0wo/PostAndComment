const defaultState = {
    isFetching: false,
    addPostErrors: {},
    type: null,
    createdPostId: null
};

export default (state = defaultState, { type, payload }) => {
    switch (type) {
        case '_ADD_POST':
            if (payload.type === 'errors checking') {
                return {
                    ...state,
                    isFetching: false,
                    addPostErrors: payload.payload.errors,
                    type: payload.type
                }
            }

            return {
                ...state,
                isFetching: false,
                addPostErrors: {},
                type: payload.type,
                createdPostId: payload.payload.id
            }

        case '_POST_IS_FETCHING':
            return {
                ...state,
                isFetching: true
            }
        case '_CLEAR_POST_SUCCESS':
            return {
                ...state,
                type: null
            }


        default:
            return state;
    }
}