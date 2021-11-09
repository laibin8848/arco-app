import React, { useState } from 'react';
import { Table, Button, Input, Breadcrumb, Card, Message, Modal } from '@arco-design/web-react';
import { IconPlus, IconDelete } from '@arco-design/web-react/icon';
import styles from './style/index.module.less';
import SysUserForm from './form';
import useOpenModal from '../../hooks/useOpenModal';
import { useTableQueryGet } from '../../hooks/useTableQuery';
import { deleteUser, deleteUserBatch } from '../../services/users';

interface SysuserFilter {
  current: number;
  pageSize: number;
  username?: string;
};

function DevicesList() {
  const [filter, setFilter] = useState<SysuserFilter>({ current: 1, pageSize: 10 });
  const { loading: userLoading, data: userListData } = useTableQueryGet('/admin-backend/mqttUser/listPage', filter);

  function onChangeTable(pagination) {
    const { current , pageSize } = pagination;
    setFilter({ current, pageSize });
  }

  function onSearch(username) {
    Message.success('数据刷新……');
    setFilter({ ...filter, username });
  }

  const columns = [
    { title: '客户端ID', dataIndex: 'id', width: 190, align: 'center' },
    { title: '用户名', dataIndex: 'username', align: 'center' },
    { title: '连接状态', dataIndex: 'connectStatus', align: 'center' },
    { title: '连接时间', dataIndex: 'connectTime', align: 'center' },
    { title: 'IP地址', dataIndex: 'ip', align: 'center' },
    { title: '协议', dataIndex: 'protocol', align: 'center' },
    { title: '设备信息', dataIndex: 'remark', align: 'center' },
    {
      title: '操作',
      dataIndex: 'operations',
      width: 140,
      fixed: 'right',
      align: 'center',
      render: (col, item) => (
        <div className={styles.operations}>
          <Button type="text" size="mini" onClick={()=> {useOpenModal(SysUserForm, { detail: item, onOk: ()=> { onSearch('') } })}}>
            详情
          </Button>
          <Button type="text" status="danger" size="mini">
            踢除
          </Button>
          {/* 下线，修改，删除 */}
        </div>
      ),
    },
  ];

  const pagination = {
    ...filter,
    total: userListData?.total,
    showSizeChanger: true,
    showTotal: (total) => `共 ${total} 条`,
  };

  return (
    <div className={styles.container}>
      <Breadcrumb style={{ marginBottom: 20 }}>
        <Breadcrumb.Item>设备管理</Breadcrumb.Item>
        <Breadcrumb.Item>客户端列表</Breadcrumb.Item>
      </Breadcrumb>
      <Card bordered={false}>
        <div className={styles.toolbar}>
          <div>
            <Button size="small" type="primary" icon={<IconPlus />} onClick={()=> {useOpenModal(SysUserForm, { onOk: ()=> { onSearch('') } })}}>
              新增设备
            </Button>
          </div>
          <div>
            <Input.Search
              style={{ width: 300 }}
              searchButton
              placeholder="请输入用户名"
              onSearch={onSearch}
            />
          </div>
        </div>
        <Table
          borderCell
          rowKey="id"
          loading={{ loading: userLoading, size: 18, dot: true, element: null }}
          onChange={onChangeTable}
          pagination={pagination}
          scroll={{ x: 1400 }}
          columns={columns}
          data={userListData?.records}
        />
      </Card>
    </div>
  );
}

export default DevicesList;