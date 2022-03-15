import React, {useEffect} from "react";
import fire from "../../firebase";
import "firebase/compat/auth";
import {useDispatch, useSelector} from "react-redux";
import {setUserId} from "../store/reducer";
import {Login} from "./Login";
import {UserPage} from "../../pages/UserPage";

function Form() {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.firestore.userId);
    const isEnter = useSelector(state => state.firestore.isEnter);

// -----------------Save to localStorage------------
    useEffect(() => {
        try {
            const raw = localStorage.getItem("userId") || [];
            dispatch(setUserId(JSON.parse(raw)));
        } catch (e) {
            console.log(e);
        }
    }, []);
    useEffect(() => {
        localStorage.setItem("userId", JSON.stringify(userId))
    }, [userId]);
// END-----------------Save to localStorage------------

    const authListener = () => {
        fire.auth().onAuthStateChanged(user => {
            if (user) {
                // clearInputs();
                dispatch(setUserId(userId));
            } else {
                dispatch(setUserId(""));
            }
        })
    };

    useEffect(() => {
        authListener();
    }, []);

    return (
        <div>
            {isEnter
                ?
                <UserPage/>
                :
                <Login/>
                }
        </div>
    )
}

export default Form;

