 import React from 'react';
 import { Chart, Geom, Axis } from 'bizcharts';

 const scale = {
   value: {
       type: "linear",
        tickCount: 5
    }
 };
 
 export default function LineChart() {
    const data = [];
    for(let i=0; i<25; i++) {
        data.push({"time": i, "value": Math.floor(Math.random()*100000)})
    }

    return (
        <Chart
            width={1200}
            height={400} 
            data={data} 
            scale={scale}>
            <Axis name="time" />
            <Axis name="value" />
            <Geom type="line" position="time*value" shape='smooth' />
        </Chart>
    )
 }