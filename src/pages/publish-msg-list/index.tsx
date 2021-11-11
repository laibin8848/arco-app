import React, { useState } from 'react';
import { Table, Button, Input, Breadcrumb, Card, Form, Space } from '@arco-design/web-react';
import styles from './style/index.module.less';
import { useTableQueryGet } from '../../hooks/useTableQuery';

interface SysuserFilter {
  current: number;
  pageSize: number;
  topic?: string;
};
const FormItem = Form.Item;

function PbulistMsgList() {
  const [filter, setFilter] = useState<SysuserFilter>({ current: 1, pageSize: 10 });
  const { loading: msgLoading, data: msgListData } = useTableQueryGet('/admin-backend/messagePublish/listPage', filter);

  function onChangeTable(pagination) {
    const { current , pageSize } = pagination;
    setFilter({ current, pageSize });
  }
  
  const columns = [
    { title: '主题', dataIndex: 'topic', width: 120, align: 'center', ellipsis: true },
    { title: 'Qos', dataIndex: 'qos', align: 'center' },
    { title: '内容', dataIndex: 'payload', align: 'center' },
    { title: '用户名', dataIndex: 'from_username', align: 'center' },
    { title: '客户端ID', dataIndex: 'from_client_id', align: 'center' },
    { title: '行为', dataIndex: 'action', align: 'center' },
  ];

  const pagination = {
    ...filter,
    total: msgListData?.total,
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
        <Breadcrumb.Item>发布消息列表</Breadcrumb.Item>
      </Breadcrumb>
      <Card bordered={false}>
        <div className={styles.toolbar}>
          <Form style={{ width: '100%' }} layout="inline" form={searchForm}>
            <FormItem label='主题' field='topic'><Input /></FormItem>
            <FormItem>
              <Space>
                <Button size="small" type="primary" onClick={()=> {doSearchForm(true)}}>
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
          loading={{ loading: msgLoading, size: 18, dot: true, element: null }}
          onChange={onChangeTable}
          pagination={pagination}
          scroll={{ x: 1400 }}
          columns={columns}
          data={msgListData?.list}
        />
      </Card>
    </div>
  );
}

export default PbulistMsgList;