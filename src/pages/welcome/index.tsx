import { Card, Typography, Statistic } from '@arco-design/web-react';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ReducerState } from '../../redux';
import useLocale from '../../utils/useLocale';
import styles from './style/index.module.less';
import { countAllClients, countOnlineClients } from '../../services/statics';

export default function Welcome() {
  const locale = useLocale();
  const userInfo = useSelector((state: ReducerState) => state.global.userInfo) || {};
  const [allClient, setAllClient] = useState('');
  const [onlineClient, setOnlineClient] = useState('');

  useEffect(()=> {
    countAllClients().then(res=> {
      setTimeout(()=> {
        setAllClient(res.data);
      }, 3000)
    });
    countOnlineClients().then(res=> {
      setTimeout(()=> {
        setOnlineClient(res.data);
      }, 3000)
    });
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Typography.Title heading={5} style={{ marginTop: 0 }}>
          {locale['welcome.title.welcome']}
        </Typography.Title>
        <Typography.Text type="secondary">
          {userInfo.username}, {userInfo.realName}
        </Typography.Text>
      </div>
      <div className={styles.content}>
        <Card style={{ marginTop: 10, width: 200, marginRight: 10 }}>
          <Statistic
            value={allClient}
            groupSeparator
            extra='设备总数'
            countUp
            loading={allClient === ''}
            styleValue={{ color: 'rgb(152, 189, 223)' }}
          />
        </Card>
        <Card style={{ marginTop: 10, width: 200 }}>
          <Statistic
            value={onlineClient}
            groupSeparator
            extra='当前在线设备量'
            loading={onlineClient === ''}
            countUp
            styleValue={{ color: 'rgb(214, 194, 78)' }}
          />
        </Card>
      </div>
    </div>
  );
}
