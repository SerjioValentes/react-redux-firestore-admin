import fire from "../firebase";
import {db} from "../firebase";
import {setEmail, setEmailError, setIsEnter, setPasswordError, setUserId} from "../components/store/reducer";
import {getAuth} from "firebase/auth";
import {collection, doc, setDoc} from "firebase/firestore";

export const authListener = () => {
    fire.auth().onAuthStateChanged(user => {
        if (user) {
            // dispatch(setUserId(userId))
        } else {
            // dispatch(setUserId(""))
        }
    })
}

export const handleLogin = (email, password) => {
    return (dispatch) => {
        fire
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                const auth = getAuth();
                dispatch(setEmail(auth.currentUser.email));
                dispatch(setIsEnter(true));
            })
            .catch(err => {
                switch (err.code) {
                    case 'auth/invalid-email':
                    case 'auth/user-disabled':
                    case 'auth/user-not-found':
                        dispatch(setEmailError(err.message));
                        break;
                    case 'auth/wrong-password':
                        dispatch(setPasswordError('Wrong password'));
                        break;
                    default:
                        console.log('delete this errors: ' + err);
                        break;
                }
            })
    }
}

export const handleSignup = (email, password, userId) => {
    const usersCollectionRef = collection(db, 'users');
    return (dispatch) => {
        fire
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                const auth = getAuth();
                dispatch(setEmail(auth.currentUser.email));
                // Add new document to firestore collection
                setDoc(doc(usersCollectionRef, `${email}`), {
                    name: 'unknown',
                    lastName: 'unknown',
                    email: email,
                    id: userId,
                    list: [],
                })
                dispatch(setIsEnter(true));
            })
            .catch(error => {
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        dispatch(setEmailError('Your e-mail already in use'));
                        break;
                    case 'auth/invalid-email':
                        dispatch(setEmailError('invalid email'));
                        break;
                    case 'auth/weak-password':
                        dispatch(setPasswordError('Your password is week'));
                        break;
                }
            })
    }
}

export const handleLogout = () => {
    fire.auth().signOut();
    return (dispatch) => {
        dispatch(setIsEnter(false));
    }
}
