import React, { useState, useContext } from 'react'

import firebaseApp from '../../services/FirebaseService';
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";

import LoginForm from './LoginForm';
import {Redirect} from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';

export default function Auth(){
    const auth = getAuth(firebaseApp);
    const [errorMessage, setErrorMessage] = useState("");
    const {currentUser} = useContext(AuthContext);

    const [form, setForm] = useState({
        email:"",
        password:"",
    })

    const login = async (e) => {
        e.preventDefault();
        if(!form.email || !form.password){
            setErrorMessage("Usuario o contraseña no válidos. Por favor vuelva a registrarse");
        }else{
            try{
                await setPersistence(auth, browserSessionPersistence)
                await signInWithEmailAndPassword(auth, form.email, form.password);
            }catch(error){
                console.error('Login error: ', error);
            }
        } 
    }

    if(currentUser){
        return <Redirect to={"/"}/>
    }

    const handleChange = (e) => {
        setForm({...form, [e.target.name]:e.target.value});
    }

    return (
        <LoginForm 
            handleChange={handleChange}
            login={login}
            errorMessage={errorMessage}
            form={form}
        />      
    ) 
}
