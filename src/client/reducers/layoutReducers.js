const defaultState = {
    isPopupVisible: false,
    isShowingLogin: true,
    registerSuccessHandle: null,
    canAnimate: true
};

export default (state = defaultState, { type, payload }) => {
    switch (type) {
        case '_TOGGLE_POPUP':
            let isPopupVisible = payload === 'hide' ? 0 : (payload === 'show' ? 1 : !state.isPopupVisible);

            return {
                ...state,
                isPopupVisible: !!isPopupVisible
            };
        case '_TOGGLE_LOGIN_REGISTER':
            let isShowingLogin = payload === 'login' ? 1 : (payload === 'register' ? 0 : !state.isLoginVisible);
            return {
                ...state,
                isShowingLogin: !!isShowingLogin
            }
        case '_TOGGLE_CAN_ANIMATE':
            let canAnimate = payload === false ? 0 : (payload === true ? 1 : !state.isPopupVisible);
            return {
                ...state,
                canAnimate: !!canAnimate
            }

        default:
            return state;
    }
}