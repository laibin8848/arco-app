import React from 'react';
import {Breadcrumb, Card } from '@arco-design/web-react';
import MenuTree from '../../components/MenuTree';
import styles from './style/index.module.less';

function SysMenus() {
  return (
    <div className={styles.container}>
      <Breadcrumb style={{ marginBottom: 20 }}>
        <Breadcrumb.Item>用户权限管理</Breadcrumb.Item>
        <Breadcrumb.Item>菜单管理</Breadcrumb.Item>
      </Breadcrumb>
      <Card bordered={false} style={{width: 700}}>
        <MenuTree showLine checkable editable />
      </Card>
    </div>
  );
}

export default SysMenus;