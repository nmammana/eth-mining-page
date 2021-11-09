import React, { useContext, useEffect, useState } from 'react'

import { MiningContext } from '../../contexts/MiningContext';

import './Main.scss';

import Loading from '../../components/Loading/Loading';
import MainTable from '../MainTable/MainTable';
import MainGraph from '../MainGraph/MainGraph';

export default function Main() {
    const {currentUser, userMiningData, userLastWeekData} = useContext(MiningContext);
    const [isLoading, setIsLoading] = useState(true);
    const [roundedSaldo, setRoundedSaldo] = useState(0);

    useEffect(() => {
        if(currentUser.nombre && userMiningData && userLastWeekData){
            setRoundedSaldo(Number.parseFloat(userLastWeekData.saldo).toFixed(4));
            setIsLoading(false);
        }
    }, [currentUser.nombre, userMiningData, userLastWeekData])

    return (
        <main>
            {isLoading && <Loading/>}
            {currentUser.nombre && userMiningData && userLastWeekData &&
                <div className="main-wrapper">
                    <section className="welcome body1">
                        <p>Bienvenido {currentUser.nombre}</p>
                    </section>
                    <section className="investments">
                        <div className="table-container">
                            <MainTable userLastWeekData={userLastWeekData} roundedSaldo={roundedSaldo}/>
                        </div>
                        <div className="graph-container">
                            <MainGraph userMiningData={userMiningData}/>
                        </div> 
                    </section>
                    <section className="balance">
                        <div className="balance-container">
                            <p>Saldo disponible [ETH]: <span className="value">{roundedSaldo}</span></p>
                        </div>
                    </section>
                </div>
            }
        </main>
    )
}
