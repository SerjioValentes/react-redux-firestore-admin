import React, {useEffect} from "react";
import {setIsUser, setLastName, setUser, setUserNameAndLastName} from "../components/store/reducer";
import {useDispatch, useSelector} from "react-redux";
import {doc, getDoc, setDoc} from "firebase/firestore";
import {db} from "../firebase";
import {LogOut} from "../components/form-login-logout/LogOut";
import {Login} from "../components/form-login-logout/Login";
import "../style/main.css";

export const UserPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.firestore.user);
    const userNameAndLastName = useSelector(state => state.firestore.userNameAndLastName);
    const isUser = useSelector(state => state.firestore.isUser);
    const email = useSelector(state => state.firestore.email);
    const lastName = useSelector(state => state.firestore.lastName);
    const isEnter = useSelector(state => state.firestore.isEnter);

    const setName = async () => {
        const userTitleRef = doc(db, 'users', `${email}`);
        const userDesrcrRef = doc(db, 'users', `${email}`);

        dispatch(setUserNameAndLastName({name: user, lastName}));

        setDoc(userTitleRef, {
            name: user,
        }, {merge: true});
        setDoc(userDesrcrRef, {
            lastName: lastName,
        }, {merge: true});
    }


    useEffect(async () => {
        const docRef = doc(db, "users", `${email}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            dispatch(setUserNameAndLastName(docSnap.data()));
        } else {
            console.log("No such document!");
        }
        dispatch(setIsUser(true))
    }, []);

    if (!isUser) {
        return (
            <div>Load...</div>
        )
    }
    if (!isEnter) {
        return (
            <Login/>
        )
    } else
        return (
            <div>
                <LogOut/>
                <div className={'user-page-main-wrapper'}>
                    <div className={'user-page-wrapper'}>
                        <div className={'user-page-update-comp'}>
                            <h3>Update user info:</h3>
                            <div>
                                <div>
                                    <div className={'user-page-input'}>
                                        <p className={''}>first name</p>

                                        <div>
                                            <input onChange={e => {
                                                dispatch(setUser(e.target.value))
                                            }}/>
                                        </div>
                                    </div>
                                    <div className={'user-page-input'}>

                                        <p className={''}>Last name</p>
                                        <div>
                                            <input onChange={e => {
                                                dispatch(setLastName(e.target.value))
                                            }}/>
                                        </div>
                                    </div>

                                </div>

                                <button
                                    className={'user-page-button'}
                                    onClick={() => {
                                        setName()
                                    }}>Update
                                </button>

                            </div>
                        </div>
                    </div>

                    <div className={'user-page-info-wrapper'}>
                        <div className={'user-page-info'}>
                            <h3>User info:</h3>
                            {
                                userNameAndLastName.map(item => (
                                    <div>
                                        <div>
                                            <div>
                                                {item.name}
                                            </div>
                                            <div>
                                                {item.lastName}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
}
