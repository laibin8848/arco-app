import React, { useState } from 'react';
import { Table, Button, Input, Breadcrumb, Card, Message, Modal } from '@arco-design/web-react';
import { IconPlus, IconDelete } from '@arco-design/web-react/icon';
import styles from './style/index.module.less';
import SysUserForm from './form';
import useOpenModal from '../../hooks/useOpenModal';
import useTableQuery from '../../hooks/useTableQuery';
import { deleteUser, deleteUserBatch, getUser } from '../../services/users';

interface SysuserFilter {
  current: number;
  pageSize: number;
  username?: string;
};

function SysUsers() {
  const [filter, setFilter] = useState<SysuserFilter>({ current: 1, pageSize: 10 });
  const { loading: userLoading, data: userListData } = useTableQuery('/admin-backend/sys/user/listByPage', filter);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  function onChangeTable(pagination) {
    const { current , pageSize } = pagination;
    setFilter({ ...filter, current, pageSize });
  }

  function onSearch(username = '') {
    Message.success('系统用户数据刷新……');
    setFilter({ ...filter, username });
  }

  function onDelete(id = '') {
    const empty = id === '' && selectedRowKeys.length === 0;
    if(empty) {
      Message.error('请选择需要删除的数据！');
      return;
    }
    const batch = id === '';
    const callApi = batch ? deleteUserBatch : deleteUser;
    const ids = batch ? selectedRowKeys.join(',') : id;
    Modal.confirm({
      title: '确定继续操作？',
      onOk: ()=> {
        callApi(ids).then(()=> {
          onSearch('');
        })
      }
    });
  }

  function onEdit(item) {
    getUser(item.id).then(res=> {
      const roleIds = [];
      res.data.userRoles.map(item=> roleIds.push(item.roleId));
      res.data.roleIds = roleIds;
      useOpenModal(SysUserForm, {
        detail: res.data,
        onOk: onSearch
      })
    })
  }

  const columns = [
    { title: '用户ID', dataIndex: 'id', width: 190, align: 'center' },
    { title: '用户名', dataIndex: 'username', align: 'center' },
    { title: '真实姓名', dataIndex: 'realName', align: 'center' },
    { title: '邮箱', dataIndex: 'email', align: 'center' },
    { title: '电话号码', dataIndex: 'mobile', align: 'center' },
    { title: '超级管理员', dataIndex: 'adminFlag', align: 'center',
      render: (col, item) => (item.adminFlag ? '是' : '否')
    },
    { title: '创建时间', dataIndex: 'createTime', align: 'center' },
    {
      title: '操作',dataIndex: 'operations',width: 140,fixed: 'right',align: 'center',
      render: (col, item) => (
        !item.adminFlag && (
          <div>
            <Button className="operations-btn" type="text" size="mini" onClick={()=> {onEdit(item)}}>
              编辑
            </Button>
            <Button className="operations-btn" type="text" status="danger" size="mini" onClick={()=> { onDelete(item.id) }}>
              删除
            </Button>
          </div>
        )
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
            <Button size="small" type="primary" icon={<IconPlus />} onClick={()=> {useOpenModal(SysUserForm, { onOk: ()=> { onSearch('') } })}}>
              新增用户
            </Button>
            <Button onClick={()=> { onDelete('') }} style={{marginLeft: '10px'}} size="small" type="default" status="danger" icon={<IconDelete />}>
              批量删除
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
          // @ts-ignore
          columns={columns}
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys,
            onChange: (selectedRowKeys) => {
              setSelectedRowKeys(selectedRowKeys);
            }
          }}
          data={userListData?.records}
        />
      </Card>
    </div>
  );
}

export default SysUsers;