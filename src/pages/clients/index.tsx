import React, { useState } from 'react';
import { Table, Button, Input, Breadcrumb, Card, Form, Space, Select, Modal, Badge } from '@arco-design/web-react';
import styles from './style/index.module.less';
// import ClientForm from './form';
// import useOpenModal from '../../hooks/useOpenModal';
import { useTableQueryGet } from '../../hooks/useTableQuery';
import { mqttUserDelete } from '../../services/clients';
import history from '../../history';

interface SysuserFilter {
  current: number;
  pageSize: number;
  username?: string;
  clientCategoryId?: string;
};
const FormItem = Form.Item;
const Option = Select.Option;

function ClientsList() {
  const [filter, setFilter] = useState<SysuserFilter>({ current: 1, pageSize: 10 });
  const { loading: userLoading, data: userListData } = useTableQueryGet('/admin-backend/mqttUser/listPage', filter);

  function onChangeTable(pagination) {
    const { current , pageSize } = pagination;
    setFilter({ ...filter, current, pageSize });
  }

  function onOperation(id) {
    Modal.confirm({
      title: '确定继续操作？',
      onOk: ()=> {
        mqttUserDelete(id).then(()=> {
          doSearchForm();
        })
      }
    });
  }

  let columns: any = [
    { title: '客户端ID', dataIndex: 'clientId', width: 160, align: 'center', fixed: 'left',
      render: (col, item) => (
        <Button type="text" size="mini" onClick={()=> { history.push(`/clients/detail?clientId=${item.clientId}`, [item.clientId, item.id]) }}>{item.clientId}</Button>
      )
    },
    { title: '用户名', dataIndex: 'username', align: 'center' },
    { title: '连接状态', dataIndex: 'connectStatus', align: 'center',
      render: (col, item) => <Badge color={item.connectStatus === 'connected' ? 'green' : 'gray'} text={item.connectStatus === 'connected' ? '在线' : '离线'} />
    },
    { title: '连接时间', dataIndex: 'connectTime', width: 180, align: 'center' },
    { title: 'IP地址', dataIndex: 'ip', align: 'center' },
    { title: '协议', dataIndex: 'protocol', align: 'center' },
    { title: '设备信息', dataIndex: 'remark', align: 'center' },
    {
      title: '操作',
      dataIndex: 'operations',
      width: 140,
      fixed: 'right',
      align: 'center',
      ellipsis: true,
      render: (col, item) => (
        <div>
          <Button className="operations-btn" type="text" size="mini" onClick={
            ()=> { history.push(`/clients/detail?clientId=${item.clientId}`, [item.clientId, item.id]) }
          }>详情</Button>
          {
            !item.superuser && (
              <>
                {/* <Button className="operations-btn" type="text" size="mini" onClick={
                  ()=> {useOpenModal(ClientForm, { detail: item, onOk: ()=> { doSearchForm() } })}
                }>修改</Button> */}
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
    setFilter( { ...filter, current, pageSize, ...parms} );
  }

  return (
    <div className={styles.container}>
      <Breadcrumb style={{ marginBottom: 20 }}>
        <Breadcrumb.Item>设备管理</Breadcrumb.Item>
        <Breadcrumb.Item>客户端列表</Breadcrumb.Item>
      </Breadcrumb>
      <Card bordered={false} style={{overflow: 'hidden'}}>
        <div className={styles.toolbar}>
          <Form style={{ width: '100%' }} layout="inline" form={searchForm}>
            <FormItem label='用户名：' field='username'><Input /></FormItem>
            <FormItem label='客户端ID：' field='clientId'><Input /></FormItem>
            <FormItem label='客户端类型：' field='userType'>
              <Select>
                <Option value="">所有</Option>
                <Option value="client">客户端</Option>
                <Option value="server">服务端</Option>
              </Select>
            </FormItem>
            <FormItem label='连线状态：' field='connectStatus'>
              <Select>
                <Option value="">所有</Option>
                <Option value="connected">在线</Option>
                <Option value="disconnected">离线</Option>
              </Select>
            </FormItem>
            <FormItem label='IP地址：' field='ip'><Input /></FormItem>
            <FormItem>
              <Space>
                {/* <Button size="small" type="primary" icon={<IconPlus />} onClick={()=> {useOpenModal(ClientForm, { onOk: ()=> { doSearchForm() } })}}>
                  新增客户端
                </Button> */}
                <Button size="small" type="secondary" onClick={()=> {doSearchForm(true)}}>
                  重置
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
          scroll={{ x: 1400 }}
          // @ts-ignore
          columns={columns}
          data={userListData?.records}
        />
      </Card>
    </div>
  );
}

export default ClientsList;