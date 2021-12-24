 import React from 'react';
 import { Chart, Axis, Point, Tooltip, Line } from 'bizcharts';

 export default function LineChart(props) {
   const { label } = props;
   const data = [];
    for(let i=0; i<25; i++) {
      data.push({"x": i, "y": Math.floor(Math.random()*1000), name: label})
    }

    return (
      <Chart autoFit height={300} data={data}>
        <Line position="x*y" color="name" />
        <Axis name="x" />
        <Axis name="y" />
        <Point position="x*y" shape="circle" />
        <Tooltip shared />
      </Chart>
    )
 }