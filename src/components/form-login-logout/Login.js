import {useDispatch, useSelector} from "react-redux";
import {setEmail, setEmailError, setPassword, setPasswordError, setSignUp} from "../store/reducer";
import React from "react";
import {collection} from "firebase/firestore";
import {db} from "../../firebase";
import {handleLogin, handleSignup} from "../../actions/signUpAndLogIn";
import "../../style/main.css";

export const Login = () => {
    const dispatch = useDispatch();
    const email = useSelector(state => state.firestore.email);
    const password = useSelector(state => state.firestore.password);
    const isSignUp = useSelector(state => state.firestore.isSignUp);
    const userId = useSelector(state => state.firestore.userId);
    const isEnter = useSelector(state => state.firestore.isEnter);
    const emailError = useSelector(state => state.firestore.emailError);
    const passwordError = useSelector(state => state.firestore.passwordError);
    const usersCollectionRef = collection(db, 'users');

    const signUp = () => {
        dispatch(handleSignup(email, password, userId, usersCollectionRef));
    }
    const logIn = () => {
        dispatch(handleLogin(email, password));
    }

    const changeButton = (isSign) => {
        dispatch(setSignUp(isSign));
        dispatch(setEmailError(''));
        dispatch(setPasswordError(''));
    }

    return (
        <div>
            <div className={'login-comp-wrapper'}>
                <div className={'login-comp-inputs'}>
                    <div>
                        <input
                            className={'login-comp-input'}
                            onChange={e => dispatch(setEmail(e.target.value))}/>
                    </div>
                    <div>
                        <input
                            type={'password'}
                            className={'login-comp-input'}
                            onChange={e => dispatch(setPassword(e.target.value))}/>
                    </div>
                    {
                        isSignUp
                            ?
                            <>
                                <div className={'login-comp-text'}>
                                    <p>Have an account allready?</p>
                                    <a
                                        href={'#'}
                                        onClick={() => changeButton(false)}>LogIn</a>
                                </div>

                                <div className={'login-comp-errors'}>
                                    {emailError}
                                </div>
                                <div className={'login-comp-errors'}>
                                    {passwordError}
                                </div>

                                <div className={'login-comp-buttons'}>
                                    <button className={'login-comp-button'} onClick={signUp}>Sign Up</button>
                                </div>
                            </>
                            :
                            <>
                                <div className={'login-comp-text'}>
                                    <p>Don't have account?</p>
                                    <a
                                        href={'#'}
                                        onClick={() => changeButton(true)}
                                    >SignUp</a>
                                </div>

                                <div className={'login-comp-errors'}>{emailError}</div>
                                <div className={'login-comp-errors'}>{passwordError}</div>

                                <div className={'login-comp-buttons'}>
                                    <button className={'login-comp-button'} onClick={logIn}>Log In</button>
                                </div>
                            </>
                    }
                </div>
            </div>
        </div>
    )
}
