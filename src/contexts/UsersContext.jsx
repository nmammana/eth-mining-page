import React , {createContext, useEffect, useState} from 'react'

import Papa from 'papaparse';

import firebaseApp from '../services/FirebaseService';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Loading from '../components/Loading/Loading';

export const UsersContext = createContext();

export default function UsersContextProvider({children}) {
    const auth = getAuth(firebaseApp);
    //const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSBUYa11bUfgbkPkZr7OTBaaat2mC2jL9auRyO1Wq92DY2dIcPDFBoQYMbVmwDD_gNkbKupp6nCOJTa/pub?gid=0&single=true&output=csv';
    const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSnHjhjbYheisr6FUtLkg8ncs32UQ5eGpL1TrBD0u-ZDw9PBAbxBRVbUOZyPpGfw5XYnWWCMHRYQPE-/pub?gid=280983031&single=true&output=csv';
    const [users, setUsers] = useState([]);
    const [isLoadingUsers, setIsLoadingUsers] = useState(true);

    

    useEffect(() => {
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

      fetchUsers();
    }, [auth])

    if(isLoadingUsers){
      return <Loading/>  
    }
   
    return (
        <UsersContext.Provider value={{users}}>
            {children}
        </UsersContext.Provider>
    )
}