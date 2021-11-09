import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import './MainGraph.scss'

export default function MainGraph({userMiningData}) {


  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="tooltip-container">
          <p className="label" style={{color: payload[0].color}}>Saldo: {payload[0].value} ETH</p>
          {/* <p className="label" style={{color: payload[1].color}}>Inversión total: {payload[1].value}</p> */}
          <p className="label">{label}</p>
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

  return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart           
          data={userMiningData}
          margin={{ top: 15, right: 20, left: 15, bottom: 5, }}>
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey="fecha" fontSize={20} />
          <YAxis fontSize={20} />
          <Tooltip content={<CustomTooltip/>}/>
          <Legend content={<CustomLegend/>}/>
          <Line type="monotone" dataKey="saldo" stroke="#82ca9d" strokeWidth={3} activeDot={{ r:6 }}/>
          {/* <Line type="monotone" dataKey="inversion" stroke="#8884d8"  strokeWidth={3} activeDot={{ r:6 }}/> */}
        </LineChart>
      </ResponsiveContainer>
  )
}



 