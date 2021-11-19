import React, { useState } from 'react';
import { Breadcrumb, Card, Tabs, Button, Space, Modal, Message } from '@arco-design/web-react';
import styles from './style/index.module.less';
import ConnectLog from './connectLog';
import history from '../../history';
import { mqttUserOffline, publishInfo } from '../../services/devices';
import LineChart from './lineChart';

const TabPane = Tabs.TabPane;

function DevicesDetail() {
  const detailId = history.location.state[0];
  const [refreshTime, setRefreshTime] = useState(0);

  function onOperation(id) {
    Modal.confirm({
      title: '确定继续操作？',
      onOk: ()=> {
        mqttUserOffline(id).then(()=> {
          Message.success('操作成功！');
        })
      }
    });
  }

  return (
    <div className={styles.container}>
      <Breadcrumb style={{ marginBottom: 20 }}>
        <Breadcrumb.Item>设备管理</Breadcrumb.Item>
        <Breadcrumb.Item>客户端详情</Breadcrumb.Item>
      </Breadcrumb>
      <Card bordered={false} style={{marginBottom: 10, textAlign: 'right'}}>
        <Space>
          <Button type="default" size="small" onClick={()=> {history.go(-1)}}>返回</Button>
          <Button status="danger" size="small" onClick={()=> {onOperation(detailId)}}>下线</Button>
          <Button type="primary" size="small" onClick={()=> {
            publishInfo(detailId).then(()=> {
              Message.success('操作成功！');
            })
          }}>获取设备信息</Button>
          <Button type="primary" size="small" onClick={()=> {setRefreshTime(Math.random())}}>刷新</Button>
        </Space>
      </Card>
      <Card bordered={false}>
        <Tabs tabPosition="left">
          <TabPane key='log' title='日志'>
            <ConnectLog detail={{clientId: detailId}} justTable="true" refreshTime={refreshTime} />
          </TabPane>
          <TabPane key='chart' title='统计'>
            <LineChart />
          </TabPane>
          {/* <TabPane key='base' title='基本信息'>
            前端可用内存：-IP地址：-MAC地址：-固件版本：-
          </TabPane> */}
        </Tabs>
      </Card>
    </div>
  );
}

export default DevicesDetail;