import React , {createContext, useEffect, useState} from 'react'

import Papa from 'papaparse';

import firebaseApp from '../services/FirebaseService';
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const UsersContext = createContext();

export default function UsersContextProvider({children}) {
    const auth = getAuth(firebaseApp);
    const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSBUYa11bUfgbkPkZr7OTBaaat2mC2jL9auRyO1Wq92DY2dIcPDFBoQYMbVmwDD_gNkbKupp6nCOJTa/pub?gid=0&single=true&output=csv';
    const [users, setUsers] = useState([]);
    const [isLoadingUsers, setIsLoadingUsers] = useState(true);

    const fetchUsers = async() => {
        setIsLoadingUsers(true);
        onAuthStateChanged(auth, (authenticatedUser) => {
          if (authenticatedUser) {
            try{
              Papa.parse(url, {
                download: true,
                header: true,
                complete: function(results) {
                  var data = results.data
                  setUsers(data);
                }
              });
            }catch(error){
              console.error('Error fetching data' , error);
            }
          }else{
            setUsers([]);
          }
          setIsLoadingUsers(false);
        });
      }

    useEffect(() => {
        fetchUsers();
    }, [])
   
    return (
        <UsersContext.Provider value={{users, isLoadingUsers}}>
            {children}
        </UsersContext.Provider>
    )
}