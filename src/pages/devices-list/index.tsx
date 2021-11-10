import React, { useState } from 'react';
import { Table, Button, Input, Breadcrumb, Card, Message, Form, Space, Select } from '@arco-design/web-react';
import { IconPlus } from '@arco-design/web-react/icon';
import styles from './style/index.module.less';
import ClientForm from './form';
import ConnectLog from './connectLog';
import useOpenModal from '../../hooks/useOpenModal';
import { useTableQueryGet } from '../../hooks/useTableQuery';
import { deleteUser, deleteUserBatch } from '../../services/users';

interface SysuserFilter {
  current: number;
  pageSize: number;
  username?: string;
};
const FormItem = Form.Item;
const Option = Select.Option;

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
      width: 180,
      fixed: 'right',
      align: 'center',
      render: (col, item) => (
        <div>
          <Button className="operations-btn" type="text" size="mini" onClick={
            ()=> {useOpenModal(ConnectLog, { detail: item })}
          }>日志</Button>
          <Button className="operations-btn" type="text" status="danger" size="mini">下线</Button>
          <Button className="operations-btn" type="text" size="mini">修改</Button>
          <Button className="operations-btn" type="text" status="danger" size="mini">删除</Button>
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
        <Breadcrumb.Item>客户端列表</Breadcrumb.Item>
      </Breadcrumb>
      <Card bordered={false}>
        <div className={styles.toolbar}>
          <Form style={{ width: '100%' }} layout="inline" form={searchForm}>
            <FormItem label='客户端ID：' field='id'><Input /></FormItem>
            <FormItem label='用户名：' field='username'><Input /></FormItem>
            <FormItem label='连线状态：' field='connectStatus'>
              <Select>
                <Option value="">所有</Option>
                <Option value="connected">在线</Option>
                <Option value="disconnected">离线</Option>
              </Select>
            </FormItem>
            <FormItem label='IP地址：' field='ip'><Input /></FormItem>
            <Space>
              <Button size="small" type="primary" icon={<IconPlus />} onClick={()=> {useOpenModal(ClientForm, { onOk: ()=> { onSearch('') } })}}>
                新增客户端
              </Button>
              <Button size="small" type="primary" onClick={()=> {doSearchForm(true)}}>
                重置
              </Button>
              <Button size="small" type="primary" onClick={()=> {doSearchForm()}}>
                查询
              </Button>
            </Space>
          </Form>
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