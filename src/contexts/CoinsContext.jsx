import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';

import Loading from '../components/Loading/Loading';

export const CoinsContext = createContext();

export default function CoinsContextProvider({children}) {

    //const ethAPI = 'https://api.ethermine.org/networkStats';
    const [coins, setCoins] = useState("");
    const [isLoadingCoins, setIsLoadingCoins] = useState(true);

    

    useEffect(() => {
        const fetchCoins = async() => {
            const res = await axios.get('https://api.ethermine.org/networkStats');
            setCoins(res.data);
            setIsLoadingCoins(false);
        }
        fetchCoins();
     
    }, [])

    if(isLoadingCoins){
      return <Loading/>  
    }
   
    return (
        <CoinsContext.Provider value={{coins}}>
            {children}
        </CoinsContext.Provider>
    )
}
