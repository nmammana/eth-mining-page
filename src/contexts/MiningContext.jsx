import React , {createContext, useContext, useEffect, useState} from 'react';
import Papa from 'papaparse';
import Loading from '../components/Loading/Loading';
import firebaseApp from '../services/FirebaseService';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { UsersContext } from './UsersContext';

export const MiningContext = createContext();

export default function MiningContextProvider({children}) {

    const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSnHjhjbYheisr6FUtLkg8ncs32UQ5eGpL1TrBD0u-ZDw9PBAbxBRVbUOZyPpGfw5XYnWWCMHRYQPE-/pub?gid=978713512&single=true&output=csv';
    const [miningData, setMiningData] = useState([]); 
    const [isLoadingData, setIsLoadingData] = useState(true);
    
    const auth = getAuth(firebaseApp); 
    const {users} = useContext(UsersContext);
    const [currentUser, setCurrentUser] = useState({
      username: "",
      id: "",
      nombre:"",
    })
    const [userMiningData, setUserMiningData] = useState([]);
    const [userLastWeekData, setUserLastWeekData] = useState({
      fecha: "",
      username: "",
      MH: "",
      inversion: "",
      saldo: "",
    });

    useEffect(() => {
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
                if(user.username === authenticatedUser.email.split('@')[0]){ 
                  setCurrentUser(user);
                }
              })
            }catch(error){
              console.error('Error getting data' , error);
            }
          }else{
            setCurrentUser({
              username: "",
              id: "",
              nombre:"",
            });
            setMiningData([])
            setUserMiningData([])
            setUserLastWeekData("")
          }
        });
      }

      if(users){
        fetchMiningData();
      }
    }, [users, auth]);

    useEffect(() => {
      const fetchCurrentUserData = () => {
        let currentUserData = [];
        miningData.forEach(dataBlock => {  
          if((currentUser.username === dataBlock.username) && dataBlock.saldo){                        
            const fechaParts = dataBlock.fecha.split('/');
            var fechaObj = new Date(+fechaParts[2], fechaParts[1] - 1, +fechaParts[0]);
            currentUserData.push({...dataBlock, dateAsInt: fechaObj.getTime(), fullDate: fechaObj});
          }
        })
        setUserMiningData(currentUserData);
      }
      
      if(miningData && currentUser.username)
      {
        fetchCurrentUserData();
      }
    }, [currentUser.username, miningData])

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
      <MiningContext.Provider value={{currentUser, userMiningData, userLastWeekData}}>
          {children}
      </MiningContext.Provider>
    )
}
