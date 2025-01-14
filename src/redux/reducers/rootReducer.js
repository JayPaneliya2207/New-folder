import {combineReducers} from "redux";
import {authReducer} from "./authReducer";
import {commonReducer} from "./commonReducer";
import {editorReducer} from "./editorReducer";
import { themeReducer } from "./themeReducer";
import { frontendReducer } from './frontendReducer';

const rootReducer = combineReducers({
    userData: authReducer,
    common: commonReducer,
    editor: editorReducer,
    theme : themeReducer,
    frontend: frontendReducer,
});

export default rootReducer;
