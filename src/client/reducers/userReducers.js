const defaultState = {
    isFetching: false,
    isAuthorized: false,
    login: {
        errors: {},
        inputs: {
            email: '',
            password: ''
        }
    },
    register: {
        errors: {},
        inputs: {
            username: '',
            email: '',
            password1: '',
            password2: ''
        },
        success: false
    },
    userData: {}
}

export default (state = defaultState, { type, payload }) => {
    switch (type) {
        case '_LOGIN_USER':
            if (payload.type === 'errors checking') {
                return {
                    ...state,
                    isAuthorized: false,
                    isFetching: false,
                    login: {
                        ...state.login,
                        errors: payload.payload.errors,

                    },
                };
            }
            return {
                ...state,
                isAuthorized: true,
                isFetching: false,
                login: {
                    ...state.login,
                    errors: {},
                    inputs: {
                        email: '',
                        password: ''
                    }
                },
                userData: payload.data

            };



        case '_REGISTER_USER':

            if (payload.type === 'registration success') {
                return {
                    ...state,
                    isFetching: false,
                    register: {
                        errors: {},
                        inputs: {
                            username: '',
                            email: '',
                            password1: '',
                            password2: ''
                        },
                        success: 1
                    }
                }
            }
            return {
                ...state,
                isFetching: false,
                register: {
                    ...state.register,
                    errors: payload.payload.errors,
                    success: 0
                }
            }

        case '_USER_IS_FETCHING':
            return {
                ...state,
                isFetching: true
            }

        case '_CLEAR_REGISTER_SUCCESS':
            return {
                ...state,
                register: {
                    ...state.register,
                    success: false
                }
            }
        case '_UPDATE_REGISTER_INPUT':
            return {
                ...state,
                register: {
                    ...state.register,
                    inputs: {
                        ...state.register.inputs,
                        [payload.name]: payload.value
                    }
                }
            }
        case '_ERASE_REGISTER_ERROR':
            return {
                ...state,
                register: {
                    ...state.register,
                    errors: {
                        ...state.register.errors,
                        [payload.name]: null
                    }
                }
            }

        case '_UPDATE_LOGIN_INPUT':
            return {
                ...state,
                login: {
                    ...state.login,
                    inputs: {
                        ...state.login.inputs,
                        [payload.name]: payload.value
                    }
                }
            }
        case '_ERASE_LOGIN_ERROR':
            return {
                ...state,
                login: {
                    ...state.login,
                    errors: {
                        ...state.login.errors,
                        [payload.name]: null
                    }
                }
            }

        case '_LOGOUT_USER':
            return {
                ...state,
                isAuthorized: false,
                userData: {},
                login: {
                    ...state.login,
                    errors: {},
                    inputs: {
                        ...state.login.inputs,
                        email: '',
                        password: ''
                    }
                },

            }
        default:
            return state;
    }
}
