import { Card, Grid, Select, DatePicker } from '@arco-design/web-react';
import React, { useEffect, useState } from 'react';
import { Chart, Line, DonutChart, Interval, Interaction } from 'bizcharts';
import styles from './style/index.module.less';
import { countClients, countServers } from '../../services/statics'

const lineDataReconnect = [];
const lineDataMsg = [];
// mock line chart datas
for(let i=0; i<25; i++) {
  lineDataReconnect.push({
    date: i,
    val: Math.floor(Math.random() * 100)
  });
}
for(let i=0; i<7; i++) {
  lineDataMsg.push({
    date: i,
    val: Math.floor(Math.random() * 1000)
  });
}

export default function Welcome() {
  const [clientData, setClientData] = useState<any>([]);
  const [serverData, setServerData] = useState<any>([]);

  useEffect(()=> {
    countClients().then(res=> {
      const all = res[0].data;
      const online = res[1].data;
      const offline = all - online;
      setClientData([
        {type: "在线设备",value: online},
        {type: "离线设备",value: offline}
      ])
    })
    countServers().then(res=> {
      const all = res[0].data;
      const online = res[1].data;
      const offline = all - online;
      setServerData([
        {type: "在线设备",value: online},
        {type: "离线设备",value: offline}
      ])
    })
  }, [])

  return (
    <div className={styles.content}>
      <Grid.Row gutter={10} style={{marginBottom: 10}}>
        <Grid.Col span={12}>
          <Card bordered={false}>
            客户端设备
            <DonutChart
              data={clientData}
              autoFit
              height={350}
              radius={0.8}
              padding="auto"
              angleField="value"
              colorField="type"
              pieStyle={{ stroke: "white", lineWidth: 5 }}
            />
          </Card>
        </Grid.Col>
        <Grid.Col span={12}>
          <Card bordered={false}>
            服务端设备
            <DonutChart
              data={serverData}
              autoFit
              height={350}
              radius={0.8}
              padding="auto"
              angleField="value"
              colorField="type"
              pieStyle={{ stroke: "white", lineWidth: 5 }}
            />
          </Card>
        </Grid.Col>
      </Grid.Row>
      <Grid.Row gutter={10} style={{marginBottom: 10}}>
        <Grid.Col span={12}>
          <Card bordered={false}>
            <div style={{display: 'flex'}}>
              <span style={{flex: 1}}>重连统计</span>
              <span><DatePicker style={{ width: 200 }} /></span>
            </div>
            <Chart height={300} autoFit data={lineDataMsg} padding={[30,20,30,50]}>
              <Interval position="date*val" style={['sales',  (val) => {
                  return {
                    lineWidth: 1,
                    strokeOpacity: 1,
                    fillOpacity: 0.4,
                    opacity: 0.65,
                  };
                }]} />
              <Interaction type="active-region" />
            </Chart>
          </Card>
        </Grid.Col>
        <Grid.Col span={12}>
          <Card bordered={false}>
            <div style={{display: 'flex'}}>
              <span style={{flex: 1}}>消息上报</span>
              <span>
                <Select defaultValue="">
                  <Select.Option value="">按分时筛选</Select.Option>
                </Select>
              </span>
            </div>
            <Chart scale={{value: {min: 0}}} padding={[10,20,50,40]} autoFit height={300} data={lineDataReconnect}>
              <Line color="#ddd" shape="hv" position="date*val" />
            </Chart>
          </Card>
        </Grid.Col>
      </Grid.Row>
    </div>
  );
}
