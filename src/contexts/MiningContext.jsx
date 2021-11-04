import React , {createContext, useContext, useEffect, useState} from 'react';
import Papa from 'papaparse';
import Loading from '../components/Loading/Loading';
import firebaseApp from '../services/FirebaseService';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { UsersContext } from './UsersContext';

export const MiningContext = createContext();

export default function MiningContextProvider({children}) {
    const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSBUYa11bUfgbkPkZr7OTBaaat2mC2jL9auRyO1Wq92DY2dIcPDFBoQYMbVmwDD_gNkbKupp6nCOJTa/pub?gid=147593243&single=true&output=csv'
    const [miningData, setMiningData] = useState([]);
    
    const [isLoadingData, setIsLoadingData] = useState(true);
    
    const auth = getAuth(firebaseApp); 
    const {users} = useContext(UsersContext);
    const [currentUser, setCurrentUser] = useState({
      nombre: "",
      email: "",
      dni:"",
    })
    const [userMiningData, setUserMiningData] = useState([]);
    const [userLastWeekData, setUserLastWeekData] = useState("");
    
    const fetchMiningData = async() => {
      onAuthStateChanged(auth, (authenticatedUser) => {
        if (authenticatedUser) {
          try{
            Papa.parse(url, {
              download: true,
              header: true,
              complete: function(results) {
                var data = results.data
                setMiningData(data);
              }
            });
            users.forEach(user => {
              if(user.email.includes(authenticatedUser.email)){
                setCurrentUser(user);
              }
            })
          }catch(error){
            console.error('Error getting data' , error);
          }
        }else{
          setCurrentUser({
            nombre: "",
            email: "",
            dni:"",
          });
          setMiningData([])
          setUserMiningData([])
          setUserLastWeekData("")
        }
      });
    }

    const fetchCurrentUserData = () => {
      let currentUserData = [];
      miningData.forEach(dataBlock => {
        if(dataBlock.dni.includes(currentUser.dni)){
          currentUserData.push(dataBlock);
        }
      })
      setUserMiningData(currentUserData);
    }

    useEffect(() => {
      if(users){
        fetchMiningData();
      }
    }, [users]);

    useEffect(() => {
      if(miningData && currentUser.nombre)
      {
        fetchCurrentUserData();
      }
    }, [currentUser.nombre, miningData])

    useEffect(() => {
      if(userMiningData){
        setUserLastWeekData(userMiningData[userMiningData.length-1]);
        setIsLoadingData(false);
      }
    }, [userMiningData])

    if(isLoadingData){
      return <Loading/>  
    }

    return ( 
      <MiningContext.Provider value={{currentUser, userMiningData, userLastWeekData, isLoadingData}}>
          {children}
      </MiningContext.Provider>
    )
}
