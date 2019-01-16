import { put, takeLatest } from 'redux-saga/effects';

function* _togglePopup({ type, payload }) {
    yield put({ type: '_TOGGLE_POPUP', payload });
}

function* _toggleLoginRegister({ type, payload }) {

    yield put({ type: '_TOGGLE_LOGIN_REGISTER', payload });

}

const layoutSagas = [
    takeLatest('TOGGLE_POPUP', _togglePopup),
    takeLatest('TOGGLE_LOGIN_REGISTER', _toggleLoginRegister)
];

export default layoutSagas;