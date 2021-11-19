import React, { useState } from 'react';
import { Table, Button, Input, Breadcrumb, Card, Message, Modal } from '@arco-design/web-react';
import { IconPlus } from '@arco-design/web-react/icon';
import styles from './style/index.module.less';
import SysRoleForm from './form';
import useOpenModal from '../../hooks/useOpenModal';
import useTableQuery from '../../hooks/useTableQuery';
import { delRole, getRole } from '../../services/roles';

interface SysuserFilter {
  current: number;
  pageSize: number;
  roleName?: string;
};

function SysRoles() {
  const [filter, setFilter] = useState<SysuserFilter>({ current: 1, pageSize: 10 });
  const { loading: roleLoading, data: roleListData } = useTableQuery('/admin-backend/sys/role/listByPage', filter);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  function onChangeTable(pagination) {
    const { current , pageSize } = pagination;
    setFilter({ ...filter, current, pageSize });
  }

  function onSearch(roleName = '') {
    Message.success('角色数据刷新……');
    setFilter({ ...filter, roleName });
  }

  function onDelete(item) {
    Modal.confirm({
      title: '确定继续操作？',
      onOk: ()=> {
        delRole(item).then(()=> {
          onSearch('');
        })
      }
    });
  }

  function onEdit(item) {
    getRole(item.id).then(res=> {
      useOpenModal(SysRoleForm, {
        detail: res.data,
        onOk: onSearch
      })
    })
  }
  
  const columns = [
    { title: '标识', dataIndex: 'roleCode', width: 190, align: 'center' },
    { title: '角色名', dataIndex: 'roleName', align: 'center' },
    { title: '描述', dataIndex: 'description', align: 'center' },
    { title: '创建人', dataIndex: 'createBy', align: 'center' },
    { title: '创建时间', dataIndex: 'createTime', align: 'center' },
    {
      title: '操作',
      dataIndex: 'operations',
      width: 140,
      fixed: 'right',
      align: 'center',
      render: (col, item) => (
        <div>
          <Button className="operations-btn" type="text" size="mini" onClick={()=> {onEdit(item)}}>
            编辑
          </Button>
          {
            !item.adminFlag && (
              <Button className="operations-btn" type="text" status="danger" size="mini" onClick={()=> { onDelete(item) }}>
                删除
              </Button>
            )
          }
        </div>
      ),
    },
  ];

  const pagination = {
    ...filter,
    total: roleListData?.total,
    showSizeChanger: true,
    showTotal: (total) => `共 ${total} 条`,
  };

  return (
    <div className={styles.container}>
      <Breadcrumb style={{ marginBottom: 20 }}>
        <Breadcrumb.Item>用户权限管理</Breadcrumb.Item>
        <Breadcrumb.Item>角色管理</Breadcrumb.Item>
      </Breadcrumb>
      <Card bordered={false}>
        <div className={styles.toolbar}>
          <div>
            <Button size="small" type="primary" icon={<IconPlus />} onClick={()=> {useOpenModal(SysRoleForm, { onOk: onSearch })}}>
              新增角色
            </Button>
          </div>
          <div>
            <Input.Search
              style={{ width: 300 }}
              searchButton
              placeholder="请输入角色名"
              onSearch={onSearch}
            />
          </div>
        </div>
        <Table
          borderCell
          rowKey="id"
          loading={{ loading: roleLoading, size: 18, dot: true, element: null }}
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
          data={roleListData?.records}
        />
      </Card>
    </div>
  );
}

export default SysRoles;