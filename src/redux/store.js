import { legacy_createStore as createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import { composeWithDevTools } from "@redux-devtools/extension";

import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";

const sagaMiddleWare = createSagaMiddleware();

const middlewareEnhancer = applyMiddleware(sagaMiddleWare);
const store = createStore(rootReducer, composeWithDevTools(middlewareEnhancer));

sagaMiddleWare.run(rootSaga);

export default store;
