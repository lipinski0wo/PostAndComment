import axios from 'axios';
import { call, put, takeEvery, select, take } from 'redux-saga/effects';
import { getUserDataFromToken, applyTokenApp, removeTokenFromApp } from '../utils/token';

function* _logInUser({ type, payload }) {
    try {
        yield put({ type: '_USER_IS_FETCHING', payload: true });
        yield put({ type: '_TOGGLE_CAN_ANIMATE', payload: false });

        const userData = yield select(state => state.user.login.inputs);

        const response = yield call(() =>
            axios
                .post('/api/user/login', userData)
                .then(response => response.data)
                .catch(err => console.log(err))
        )

        if (response.type === 'server failure') {
            yield put({ type: '_USER_IS_FETCHING', payload: false });

        } else if (response.type === 'login success') {
            const token = response.payload.token;

            applyTokenApp(token);
            const data = getUserDataFromToken(token);

            yield put({ type: '_LOGIN_USER', payload: { data } })
            yield put({ type: '_TOGGLE_POPUP', payload: 'hide' });

        } else {
            yield put({ type: '_LOGIN_USER', payload: response })

        }
        yield put({ type: '_TOGGLE_CAN_ANIMATE', payload: true });

    } catch (error) {
        console.log(error)
    }
}

function* _registerUser({ type, payload }) {
    try {
        yield put({ type: '_USER_IS_FETCHING', payload: true });
        yield put({ type: '_TOGGLE_CAN_ANIMATE', payload: false });

        const userData = yield select(state => state.user.register.inputs);

        const response = yield call(() =>
            axios
                .post('/api/user/register', userData)
                .then(response => response.data)
                .catch(err => console.log(err))
        )
        if (response.type === 'server failure') {
            yield put({ type: '_USER_IS_FETCHING', payload: false });
        } else {
            yield put({ type: '_REGISTER_USER', payload: response });
        }

        yield put({ type: '_TOGGLE_CAN_ANIMATE', payload: true });

    } catch (error) {
        console.log(error);
    }
}

function* _logoutUser({ type, payload }) {
    try {
        yield removeTokenFromApp();

        yield put({ type: '_LOGOUT_USER', payload: true });
        yield put({ type: '_TOGGLE_POPUP', payload: 'hide' });

    } catch (error) {
        console.log(error);
    }
}

const userSagas = [
    takeEvery('REGISTER_USER', _registerUser),
    takeEvery('LOGIN_USER', _logInUser),
    takeEvery('LOGOUT_USER', _logoutUser)
];

export default userSagas;