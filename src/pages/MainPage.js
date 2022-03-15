import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {db} from "../firebase";
import {LogOut} from "../components/form-login-logout/LogOut";
import {Login} from "../components/form-login-logout/Login";
import {setDescription, setList, setTitle} from "../components/store/mainPageReducer";
import {doc, updateDoc, arrayUnion, getDoc, arrayRemove} from "firebase/firestore";
import "../style/main.css";

export const MainPage = () => {
    const dispatch = useDispatch();
    const isEnter = useSelector(state => state.firestore.isEnter);
    const list = useSelector(state => state.mainPage.list);
    const isFetching = useSelector(state => state.mainPage.isFetching);
    const email = useSelector(state => state.firestore.email);
    const title = useSelector(state => state.mainPage.title);
    const description = useSelector(state => state.mainPage.description);
    const docRef = doc(db, "users", `${email}`);

    const newItemList = async () => {
        const listRef = doc(db, 'users', `${email}`);

        updateDoc(listRef, {
            list: arrayUnion({
                title: title,
                description: description,
            })
        });
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            dispatch(setList(docSnap.data()));
        } else {
            console.log("No such document!");
        }
    }

    const deletePost = async (t, d) => {
        const listRef = doc(db, 'users', `${email}`);

        updateDoc(listRef, {
            list: arrayRemove(
                {
                    title: t,
                    description: d,
                }
            )
        })
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            dispatch(setList(docSnap.data()));
        } else {
            console.log("No such document!");
        }
    }


    useEffect(async () => {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            dispatch(setList(docSnap.data()));
        } else {
            console.log("No such document!");
        }

    }, [])


    if (!isFetching) {
        return (
            <div>Load...</div>
        )
    } else
        return (
            <div>
                {
                    isEnter
                        ?
                        <>
                            <LogOut/>
                            <div className={'main-page-wrapper'}>
                                <div className={'main-page-content-wrapper'}>
                                    <h2>Add New item:</h2>
                                    <div className={'main-page-input'}>
                                        <h3>Title</h3>
                                        <div>
                                            <input onChange={event => dispatch(setTitle(event.target.value))}/>
                                        </div>
                                    </div>

                                    <div>
                                        <h3>Reciept</h3>
                                        <textarea onChange={event => dispatch(setDescription(event.target.value))}/>
                                    </div>

                                    <div className={'main-page-button'}>
                                        <button onClick={newItemList}>Add</button>
                                    </div>
                                </div>
                            </div>

                            <div>
                                {
                                    list.list.map((item, i) => (
                                            <div key={i}>
                                                <div className={'main-page-list-items'}>
                                                    <div>
                                                        <h3>{item.title}</h3>
                                                        <p>{item.description}</p>
                                                    </div>
                                                    <div>

                                                    <button
                                                        onClick={() => deletePost(item.title, item.description)}>Delete
                                                    </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                            </div>
                        </>
                        :
                        <Login/>
                }
            </div>
        )
}

