const SET_EMAIL = `SET_EMAIL`;
const SET_USER = `SET_USER`;
const SET_IS_USER = `SET_IS_USER`;
const SET_LASTNAME = `SET_LASTNAME`;
const SET_PASSWORD = `SET_PASSWORD`;
const SET_USER_ID = `SET_USER_ID`;
const SET_EMAIL_ERROR = `SET_EMAIL_ERROR`;
const SET_PASSWORD_ERROR = `SET_PASSWORD_ERROR`;
const SET_IS_ENTER = `SET_IS_ENTER`;
const SET_IS_SIGNUP = `SET_IS_SIGNUP`;
const SET_NAME_AND_LASTNAME = `SET_NAME_AND_LASTNAME`;

const defaultState = {
    user: [],
    userNameAndLastName: [],
    isUser: false,
    displayName: '',
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    hasAccount: '',
    userId: '',
    isEnter: false,
    isSignUp: false,
}

export default function requestReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_LASTNAME:
            return{
             ...state,
             lastName: action.payload,
            }
        case SET_IS_USER:
            return {
                ...state,
                isUser: action.payload,
            }
        case SET_NAME_AND_LASTNAME:
            return {
                ...state,
                userNameAndLastName: [action.payload],
            }
        case SET_USER:
            return{
                ...state,
                user: action.payload,
            }
        case SET_EMAIL:
            return {
                ...state,
                email: action.payload,
            }
        case SET_USER_ID:
            return{
                ...state,
                userId: action.payload,
            }
        case SET_PASSWORD:
            return {
                ...state,
                password: action.payload,
            }
        case SET_PASSWORD_ERROR:
            return {
                ...state,
                passwordError: action.payload,
            }
        case SET_IS_ENTER:
            return{
                ...state,
                isEnter: action.payload,
            }
        case SET_IS_SIGNUP:
            return {
                ...state,
                isSignUp: action.payload,
            }
        case SET_EMAIL_ERROR:
            return {
                ...state,
                emailError: action.payload,
            }
        default:
            return state
    }
}

export const setEmail = (email) => ({type: SET_EMAIL, payload: email});
export const setUser = (user) => ({type: SET_USER, payload: user});
export const setIsUser = (isUser) => ({type: SET_IS_USER, payload: isUser});
export const setLastName = (lastName) => ({type: SET_LASTNAME, payload: lastName});
export const setPassword = (password) => ({type: SET_PASSWORD, payload: password});
export const setEmailError = (emailError) => ({type: SET_EMAIL_ERROR, payload: emailError});
export const setUserId = (userId) => ({type: SET_USER_ID, payload: userId});
export const setPasswordError = (passwordError) => ({type: SET_PASSWORD_ERROR, payload: passwordError});
export const setIsEnter = (isEnter) => ({type: SET_IS_ENTER, payload: isEnter});
export const setSignUp = (isSignUp) => ({type: SET_IS_SIGNUP, payload: isSignUp});
export const setUserNameAndLastName = (array) => ({type: SET_NAME_AND_LASTNAME, payload: array});
