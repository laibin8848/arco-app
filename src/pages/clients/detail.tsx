import React, { useState, useEffect } from 'react';
import { Breadcrumb, Card, Tabs, Button, Space, Modal, Message, Popover } from '@arco-design/web-react';
import styles from './style/index.module.less';
import ConnectLog from './connectLog';
import history from '../../history';
import { mqttUserOffline, publishInfo, mqttUserDetail } from '../../services/clients';
import LineChart from './lineChart';
import PbulistMsgList from '../publish-msg-list';
import useOpenModal from '../../hooks/useOpenModal';
import updateCmdForm from './updateCmdForm';

const TabPane = Tabs.TabPane;

function ClientDetail() {
  const detailId = history.location.state[0];
  const detailIdKey = history.location.state[1];
  const [refreshTime, setRefreshTime] = useState(0);
  const [dtuInfo, setDtuInfo] = useState<any>({
    ip: '',
    mac: '',
    ver: '',
    mem: 0,
    cmdTime: '',
    cmdInfo: {}
  });

  useEffect(()=> {
    mqttUserDetail(detailIdKey).then(res=> {
      const dtuInfo = JSON.parse(res.data.dtuInfo) || {};
      setDtuInfo({
        ip: dtuInfo.ip || '-',
        mac: dtuInfo.mac || '-',
        ver: dtuInfo.ver || '-',
        mem: dtuInfo.free_mem || 0,
        cmdTime: res.data.dtuCmdTime || '',
        cmdInfo: JSON.parse(res.data.dtuCmd) || {}
      })
    });
  }, [refreshTime])

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
      <Card bordered={false} style={{marginBottom: 10}}>
        <div style={{display: 'flex', width: '100%'}}>
          <div style={{fontWeight: 'bold'}}>
            <Space size={30}>
              <span>客户端ID：{detailId}</span>
              <span>当前可用内存：{Math.round(dtuInfo.mem/1024) || '-'}KB</span>
              <span>IP地址：{dtuInfo.ip}</span>
              <span>MAC地址：{dtuInfo.mac}</span>
              <span>固件版本：{dtuInfo.ver}</span>
            </Space>
          </div>
          <div style={{flex: 1, textAlign: 'right'}}>
            <Space>
              <Button type="default" size="small" onClick={()=> {history.go(-1)}}>返回</Button>
              <Button status="danger" size="small" onClick={()=> {onOperation(detailId)}}>下线</Button>
              <Popover
                title='当前指令'
                content={
                  <span>
                    <p>更新时间：{dtuInfo.cmdTime || '-'}</p>
                    <p>指令内容：{dtuInfo.cmdInfo.msg || '-'}</p>
                    <p>重新执行时间(毫秒)：{dtuInfo.cmdInfo.repeat || '-'}</p>
                  </span>
                }
              >
                <Button type='primary' onClick={()=> {useOpenModal(updateCmdForm, {detailId, onOk: ()=> {setRefreshTime(Math.random())}})}}>更新指令</Button>
              </Popover>
              <Button type="primary" size="small" onClick={()=> {
                publishInfo(detailId).then(()=> {
                  Message.success('操作成功！');
                })
              }}>同步</Button>
              <Button type="primary" size="small" onClick={()=> {setRefreshTime(Math.random())}}>刷新</Button>
            </Space>
          </div>
        </div>
      </Card>
      <Card bordered={false}>
        <Tabs tabPosition="left">
          <TabPane key='log' title='日志'>
            <ConnectLog detail={{clientId: detailId}} justTable="true" refreshTime={refreshTime} />
          </TabPane>
          <TabPane key='msg' title='消息列表'>
            <PbulistMsgList byClientId={detailId} refreshTime={refreshTime}/>
          </TabPane>
          <TabPane key='chart' title='统计'>
            <LineChart label="重连次数" />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
}

export default ClientDetail;