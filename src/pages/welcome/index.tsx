import { Card, Typography, Grid, Statistic } from '@arco-design/web-react';
import React from 'react';
import { IconArrowRise } from '@arco-design/web-react/icon';
import { useSelector } from 'react-redux';
import { ReducerState } from '../../redux';
import useLocale from '../../utils/useLocale';
import styles from './style/index.module.less';

export default function Welcome() {
  const locale = useLocale();
  const userInfo = useSelector((state: ReducerState) => state.global.userInfo) || {};
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
        <Card style={{ marginTop: 10 }}>
          <Grid.Row justify="space-between">
            <Grid.Col span={6}>
              <Statistic
                title="客户端数量"
                value={3000}
                groupSeparator
                prefix={<IconArrowRise />}
                countUp
                styleValue={{ color: 'blue' }}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Statistic
                title="连接记录"
                value={600000}
                groupSeparator
                prefix={<IconArrowRise />}
                countUp
                styleValue={{ color: '#0fbf60' }}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Statistic
                title="在线客户端"
                value={66}
                groupSeparator
                suffix='%'
                prefix={<IconArrowRise />}
                countUp
                styleValue={{ color: '#0fbf60' }}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Statistic
                title="下线客户端"
                value={34}
                groupSeparator
                suffix='%'
                prefix={<IconArrowRise />}
                countUp
                styleValue={{ color: 'red' }}
              />
            </Grid.Col>
          </Grid.Row>
        </Card>
      </div>
    </div>
  );
}
