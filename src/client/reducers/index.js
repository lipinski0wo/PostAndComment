import { combineReducers } from 'redux';
import userReducers from './userReducers';
import layoutReducers from './layoutReducers';
import postReducers from './postReducers';
import talkieReducers from './talkieReducers';

export default combineReducers({
    user: userReducers,
    layout: layoutReducers,
    post: postReducers,
    talkie: talkieReducers,
});