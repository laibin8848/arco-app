import React, { useState } from 'react';
import { Table, Button, Input, Breadcrumb, Card, Form, Space, Modal } from '@arco-design/web-react';
import { IconPlus } from '@arco-design/web-react/icon';
import styles from './style/index.module.less';
import PwdForm from './form';
import useOpenModal from '../../hooks/useOpenModal';
import { useTableQueryGet } from '../../hooks/useTableQuery';
import { deleteUserAccount } from '../../services/clients';

interface DevicePwdFilter {
  current: number;
  pageSize: number;
  username?: string;
};
const FormItem = Form.Item;

function DevicesPwdList() {
  const [filter, setFilter] = useState<DevicePwdFilter>({ current: 1, pageSize: 10 });
  const { loading: userLoading, data: userListData } = useTableQueryGet('/admin-backend/mqttUser/listAccountUserByPage', filter);

  function onChangeTable(pagination) {
    const { current , pageSize } = pagination;
    setFilter({ ...filter, current, pageSize });
  }

  function onOperation(id, type = '') {
    Modal.confirm({
      title: '确定继续操作？',
      onOk: ()=> {
        deleteUserAccount(id).then(()=> {
          doSearchForm();
        })
      }
    });
  }

  const columns = [
    { title: 'ID', dataIndex: 'id', align: 'center', width: 80 },
    { title: '用户名', dataIndex: 'username', align: 'center' },
    {
      title: '操作',
      dataIndex: 'operations',
      width: 100,
      align: 'center',
      render: (col, item) => (
        <div>
          {
            !item.superuser && (
              <>
                <Button className="operations-btn" type="text" size="mini" onClick={
                  ()=> {useOpenModal(PwdForm, { detail: item, onOk: ()=> { doSearchForm() } })}
                }>修改</Button>
                <Button className="operations-btn" type="text" status="danger" size="mini" onClick={()=> {onOperation(item.id)}}>删除</Button>
              </>
            )
          }
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

  const [searchForm] = Form.useForm();

  function doSearchForm(reset = false) {
    reset && searchForm.resetFields();
    const { current, pageSize } = filter;
    const parms = searchForm.getFieldsValue();
    setFilter( {current, pageSize, ...parms} );
  }

  return (
    <div className={styles.container}>
      <Breadcrumb style={{ marginBottom: 20 }}>
        <Breadcrumb.Item>设备管理</Breadcrumb.Item>
        <Breadcrumb.Item>登录信息管理</Breadcrumb.Item>
      </Breadcrumb>
      <Card bordered={false}>
        <div className={styles.toolbar}>
          <Form style={{ width: '100%' }} layout="inline" form={searchForm}>
            <FormItem label='用户名：' field='username'><Input /></FormItem>
            <FormItem>
              <Space>
                <Button size="small" type="primary" icon={<IconPlus />} onClick={()=> {useOpenModal(PwdForm, { onOk: ()=> { doSearchForm() } })}}>
                  新增账号
                </Button>
                <Button size="small" type="primary" onClick={()=> {doSearchForm()}}>
                  查询
                </Button>
              </Space>
            </FormItem>
          </Form>
        </div>
        <Table
          borderCell
          rowKey="id"
          loading={{ loading: userLoading, size: 18, dot: true, element: null }}
          onChange={onChangeTable}
          pagination={pagination}
          // @ts-ignore
          columns={columns}
          data={userListData?.records}
        />
      </Card>
    </div>
  );
}

export default DevicesPwdList;