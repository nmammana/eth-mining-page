import React, { useContext } from 'react'

import './Header.scss'
import { Link } from 'react-router-dom'

import firebaseApp from '../../services/FirebaseService';
import { getAuth, signOut } from "firebase/auth";

import '../../assets/icons/coolicons.scss'

import { FaEthereum } from "react-icons/fa";
import LogoutAlert from './LogoutAlert';
import { AuthContext } from '../../contexts/AuthContext';
import { withRouter } from 'react-router'

function Header(props){
    const auth = getAuth(firebaseApp);   
    const {currentUser} = useContext(AuthContext);

    const logout = async () =>{
        await signOut(auth);
        props.history.push("/login");
    }

    return (
        <header>
            <div className="header-wrapper">
                <section className="logo-container">  
                    <Link to={"/"}>
                        <div className="logo">
                            <p className="heading2">CMS Crypto</p>  
                            <span className="icon"><FaEthereum/></span>
                        </div>
                    </Link>
                </section>

                <section className="logout-container">
                    {!!currentUser && <LogoutAlert logout={logout}/>}
                </section>
            </div>        
        </header>
        
    )
}

export default withRouter(Header);