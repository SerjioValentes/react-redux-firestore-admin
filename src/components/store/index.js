import {createStore, combineReducers, applyMiddleware} from "redux";
import reducer from "./reducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import mainPageReducer from "./mainPageReducer";

const rootReducer = combineReducers({
    firestore: reducer,
    mainPage: mainPageReducer,
})
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
