import { call, put, takeEvery, fork } from "redux-saga/effects";
import * as actions from '../actions/users'
import * as api from '../../api/user'

//worker saga
function* getUsers() {
    try {
        const result = yield call(api.getUsers)
        console.log('result', result)
        yield put(actions.getUserSuccess({
            items: result.data
        }))
    } catch (error) {
        
    }
}

//watcher
function* watchGetUserRequest() {
    yield takeEvery(actions.Types.GET_USER_REQUEST, getUsers)
}

const usersSagas = [
  fork(watchGetUserRequest)
]
export default usersSagas
//fork 
// In redux-saga you can dynamically fork tasks that execute in the background using 2 Effects

// fork is used to create attached forks
// spawn is used to create detached forks

// fork:
// So we have our main process if we fork we call fork with in our main process we actually create a child

// process and we can do that any number of times we can create we can fork and create child processes

// within other child processes.

// So in the context of redux saga we have our main.

// We have a root saga.

// So this would be T1 one our root saga and all our watcher sagas will be forked from this route saga.

// This would be, fork1 for example would be watch get users. fork2 to would be.

// Watch Delete users request.

// Fork 3 would be create user req.

// T1 ----> fork1 ---> T2 ----> fork2---
// T1 ----> fork2 ---> T3 ----> fork3---


// What's the point in this in redux saga?

// Well if you think about it if we've got separate processes running all our watches all our logic is
// nicely separated into these separate processes.

// So any errors that occur here we can catch effectively and act upon without affecting these set these second and third processes.

// Also we can run these in parallel so we're not waiting for get to users.

// The watch gets users request saga to run before then running the delete users request saga.

// For example. We're running them all in parallel.So like I said before any errors that may occur in one process one child process is not going to affect any other of these child processes.