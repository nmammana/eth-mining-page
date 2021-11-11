import React from 'react'
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './MainGraph.scss'



export default function MainGraph({userMiningData}) {


  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      
      let date = new Date(payload[0].value)
      return (
        <div className="tooltip-container">
          <p className="label" style={{color: "#faf8f7"}}>Fecha: {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</p>
          <p className="label" style={{color: "#82ca9d"}}>Saldo: {payload[1].value} ETH</p>
          {/* <p className="label">{label}</p> */}
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({payload, label}) => {
    if (payload && payload.length) {
      return (
        <div className="legend-container">
          <p className="label" style={{color: payload[0].color}}>Evolución del saldo [ETH]</p>
          {/* <p className="label" style={{color: payload[1].color}}>Inversión total</p> */}
        </div>
      );
    }
    return null;
  }

  const CustomizedAxisTick = ({ x, y, label, payload }) => {
    let date = new Date(payload.value)    
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={36} y={0} dy={14} fontSize="16px" fill="#727375"/* fontFamily="bold" */ textAnchor="end" /* fill="#363636" */>
          {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}
        </text>
      </g>
    );
    }

  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{ top: 15, right: 20, left: 15, bottom: 5, }}>
            <CartesianGrid strokeDasharray="5 5"/>
            <XAxis  dataKey="dateAsInt" type="number" domain={['dataMin', 'dataMax']} 
                    tick={CustomizedAxisTick} tickCount={6} interval={1} name="fecha" fontSize={15}/>
            <YAxis type="number" dataKey="saldo" name="saldo" unit="ETH" fontSize={15}/>
            <Tooltip content={<CustomTooltip/>} cursor={{ strokeDasharray: '3 3' }} />
            <Legend content={<CustomLegend/>}/>
            <Scatter  name="Balance" data={userMiningData} fill="#82ca9d" line 
                      lineJointType='monotoneX' r={20} strokeWidth={3}/>
        </ScatterChart>
      </ResponsiveContainer>

    {/* 
      Grafica en forma de linea usada anteriormente: solo grafica punto por punto
      <ResponsiveContainer width="100%" height="100%">
        <LineChart           
          data={userMiningData}
          margin={{ top: 15, right: 20, left: 15, bottom: 5, }}>
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis dataKey="fecha" fontSize={15} />
          <YAxis type="number" fontSize={15} />
          <Tooltip content={<CustomTooltip/>}/>
          <Legend content={<CustomLegend/>}/>
          <Line type="monotone" dataKey="saldo" stroke="#82ca9d" strokeWidth={3} activeDot={{ r:6 }}/>
          <Line type="monotone" dataKey="inversion" stroke="#8884d8"  strokeWidth={3} activeDot={{ r:6 }}/> 
        </LineChart>
      </ResponsiveContainer> 
    */}
      
    </>
      
  )
}



 