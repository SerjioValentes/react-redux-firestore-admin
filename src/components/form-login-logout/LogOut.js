import React from "react";
import {useDispatch} from "react-redux";
import {handleLogout} from "../../actions/signUpAndLogIn";
import "firebase/compat/auth";

export const LogOut = () => {
    const dispatch = useDispatch();

    return (
        <nav className="logout-wrapper">
                <button onClick={() => dispatch(handleLogout())}>Logout</button>
        </nav>
    )
}
