import {
  call,
  put,
  takeEvery,
  takeLatest,
  take,
  fork,
} from "redux-saga/effects";
import * as actions from "../actions/users";
import * as api from "../../api/user";

//worker saga
function* getUsers() {
  try {
    const result = yield call(api.getUsers);
    yield put(
      actions.getUserSuccess({
        items: result.data,
      })
    );
  } catch (error) {
    yield put(
      actions.usersError({
        error: "An error occurred when trying to get the users",
      })
    );
  }
}
function* createUser(action) {
  // console.log("action", action); //--->{
  //     "type": "users/create_user_request",
  //     "payload": {
  //         "firstName": "Prateek",
  //         "lastName": "Badjatya"
  //     }
  // }
  try {
    yield call(api.createUser, {
      firstname: action.payload.firstName,
      lastName: action.payload.lastName,
    });

    yield call(getUsers);
  } catch (error) {
    yield put(
      actions.usersError({
        error: "An error occurred when trying to create the user",
      })
    );
  }
}

// takeEvery - enables the use of several fetchData objects at the same time. At a given moment, we can start a new fetchData task while there are still one or more previous fetchData tasks which have not yet terminated. takeLatest - Only one fetchData task can be active at any given moment.

// takeLatest allows only one fetchData task to run at any moment. And it will be the latest started task. If a previous task is still running when another fetchData task is started, the previous task will be automatically cancelled.

//watcher
function* watchGetUserRequest() {
  yield takeEvery(actions.Types.GET_USER_REQUEST, getUsers);
}

function* watchCreateUserRequest() {
  yield takeLatest(actions.Types.CREATE_USER_REQUEST, createUser);
}

function* deleteUser({ userId }) {
  /* 
   Once the delete user action has been dispatched.We've entered into this while true. And then below here we're calling the deleteUser which will then call the API in this deleteUser worker saga.But until any of this resolves we're actually unable to come back into this while loop. So until this resolves. Essentially this watch delete user request is ignoring any additional delete user request actions that may have been dispatched.
   In the meantime So we need to wait for this entire delete user saga to resolve before.
  */
  try {
    yield call(api.deleteUser, userId);
    yield call(getUsers);
  } catch (error) {
    yield put(
      actions.usersError({
        error: "An error occurred when trying to delete the user",
      })
    );
  }
}

function* watchDeleteUserRequest() {
  while (true) {
    const action = yield take(actions.Types.DELETE_USER_REQUEST);
    yield call(deleteUser, {
      userId: action.payload.userId,
    });
  }
}

const usersSagas = [
  fork(watchGetUserRequest),
  fork(watchCreateUserRequest),
  fork(watchDeleteUserRequest),
];
export default usersSagas;
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
