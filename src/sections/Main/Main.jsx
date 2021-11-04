import React, { useContext, useEffect } from 'react'

import { MiningContext } from '../../contexts/MiningContext';

import './Main.scss';

import Loading from '../../components/Loading/Loading';
import MainTable from '../MainTable/MainTable';
import MainGraph from '../MainGraph/MainGraph';

export default function Main() {
    const {currentUser, userMiningData, userLastWeekData, isLoadingData} = useContext(MiningContext);

    return (
        <main>
            {/* TODO: Ajustar ese estado para que sea un isLoading */}
            {!currentUser.nombre && <Loading/>}
            {currentUser.nombre && userMiningData && userLastWeekData &&
                <div className="main-wrapper">
                    <section className="welcome body1">
                        <p>Bienvenido {currentUser.nombre}</p>
                    </section>
                    <section className="investments">
                        <div className="table-container">
                            <MainTable userLastWeekData={userLastWeekData}/>
                        </div>
                        <div className="graph-container">
                            <MainGraph userMiningData={userMiningData}/>
                        </div> 
                    </section>
                    <section className="balance">
                        <div className="balance-container">
                            <p>Saldo disponible: <span className="value">{userLastWeekData.saldo}</span></p>
                        </div>
                    </section>
                </div>
            }
        </main>
    )
}
