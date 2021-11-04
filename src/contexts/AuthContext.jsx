import React , {createContext, useEffect, useState} from 'react'

import firebaseApp from '../services/FirebaseService';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Loading from '../components/Loading/Loading';

export const AuthContext = createContext();

export default function AuthContextProvider({children}) {
    const auth = getAuth(firebaseApp);
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect( () => {
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setPending(false)
        });
    })

    if(pending){
        return <Loading/>  
    }
   
    return (
        <AuthContext.Provider value={{currentUser, pending}}>
            {children}
        </AuthContext.Provider>
    )
}