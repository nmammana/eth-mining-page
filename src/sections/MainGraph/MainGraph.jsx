import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import './MainGraph.scss'

const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

export default function MainGraph({userMiningData}) {


  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="tooltip-container">
          <p className="label" style={{color: payload[0].color}}>Inversión total: {payload[0].value}</p>
          <p className="label" style={{color: payload[1].color}}>Ganancia total: {payload[1].value}</p>
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
          <p className="label" style={{color: payload[0].color}}>Inversión total</p>
          <p className="label" style={{color: payload[1].color}}>Ganancia total</p>
        </div>
      );
    }
    return null;
  }

  return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart           
          data={userMiningData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5, }}>
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey="fecha" fontSize={20} />
          <YAxis fontSize={20} />
          <Tooltip content={<CustomTooltip/>}/>
          <Legend content={<CustomLegend/>}/>
          <Line type="monotone" dataKey="inversion_total" stroke="#8884d8" strokeWidth={3} activeDot={{ r:6 }}/>
          <Line type="monotone" dataKey="ganancia_total" stroke="#82ca9d" strokeWidth={3} activeDot={{ r:6 }}/>
        </LineChart>
      </ResponsiveContainer>
  )
}



 