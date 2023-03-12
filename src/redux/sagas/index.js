import usersSagas from './users';
import {all} from 'redux-saga/effects'
export default function* rootSaga() {
    yield all([
        ...usersSagas
    ])
}

//yield all will do in the root saga is allow all these forked processes to be created in parallel.