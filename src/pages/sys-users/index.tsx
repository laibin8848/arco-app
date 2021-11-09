import React, { useState } from 'react';
import { Table, Button, Input, Breadcrumb, Card } from '@arco-design/web-react';
import { IconPlus } from '@arco-design/web-react/icon';
import styles from './style/index.module.less';
import SysUserForm from './form';
import useOpenModal from '../../hooks/useOpenModal';
import useTableQuery from '../../hooks/useTableQuery';

interface SysuserFilter {
  current: number;
  pageSize: number;
  username?: string;
};

function sysUsers() {
  const [filter, setFilter] = useState<SysuserFilter>({ current: 1, pageSize: 10 });
  const { loading: userLoading, data: userListData } = useTableQuery('/api/sys/users', filter);

  function onChangeTable(pagination) {
    const { current , pageSize } = pagination;
    setFilter({ current, pageSize });
  }

  function onSearch(username) {
    setFilter({ ...filter, username });
  }

  const columns = [
    { title: '用户ID', dataIndex: 'id' },
    { title: '用户名', dataIndex: 'name' },
    { title: '角色', dataIndex: 'role' },
    { title: '电话号码', dataIndex: 'phone' },
    { title: '创建时间', dataIndex: 'createdTime' },
    {
      title: '操作',
      dataIndex: 'operations',
      width: 150,
      fixed: 'right',
      align: 'center',
      render: () => (
        <div className={styles.operations}>
          <Button type="text" size="mini">
            编辑
          </Button>
          <Button type="text" status="danger" size="mini">
            删除
          </Button>
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
        <Breadcrumb.Item>用户权限管理</Breadcrumb.Item>
        <Breadcrumb.Item>用户列表</Breadcrumb.Item>
      </Breadcrumb>
      <Card bordered={false}>
        <div className={styles.toolbar}>
          <div>
            <Button size="small" type="primary" icon={<IconPlus />} onClick={()=> {useOpenModal(SysUserForm, {})}}>
              新增用户
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
          data={userListData?.list}
        />
      </Card>
    </div>
  );
}

export default sysUsers;
