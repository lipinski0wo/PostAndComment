import axios from 'axios';
import { takeEvery, put, call } from 'redux-saga/effects';

function* _addPost({ type, payload }) {
    try {
        yield put({ type: '_POST_IS_FETCHING', payload: true });
        const response = yield call(() =>
            axios
                .post('api/post/createPost', payload)
                .then(response => response.data)
                .catch(err => console.log(err))
        );
        yield put({ type: '_ADD_POST', payload: response });


    } catch (err) {
        console.log(err);
    }
}


const postSagas = [
    takeEvery('ADD_POST', _addPost)
];

export default postSagas;