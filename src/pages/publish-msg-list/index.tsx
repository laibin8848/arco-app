import React, { useState } from 'react';
import { Table, Button, Input, Breadcrumb, Card, Form, Space } from '@arco-design/web-react';
import styles from './style/index.module.less';
import { useTableQueryGet } from '../../hooks/useTableQuery';

interface SysuserFilter {
  current: number;
  pageSize: number;
  topic?: string;
  clientId?: string;
};
const FormItem = Form.Item;

function PbulistMsgList(props) {
  const { byClientId } = props;
  const [filter, setFilter] = useState<SysuserFilter>({ current: 1, pageSize: 10, clientId: byClientId || '' });
  const { loading: msgLoading, data: msgListData } = useTableQueryGet('/admin-backend/messagePublish/listPage', filter);

  function onChangeTable(pagination) {
    const { current , pageSize } = pagination;
    setFilter({ current, pageSize });
  }
  
  const columns = [
    { title: '主题', dataIndex: 'topic', width: 120, align: 'center', ellipsis: true },
    { title: '客户端ID', dataIndex: 'from_client_id', width: 180, align: 'center' },
    { title: '用户名', dataIndex: 'from_username', width: 150, align: 'center' },
    { title: 'Qos', dataIndex: 'qos', width: 80, align: 'center' },
    { title: '内容', dataIndex: 'payload', align: 'center', ellipsis: true },
    { title: '行为', dataIndex: 'action', align: 'center' },
    { title: '时间', dataIndex: 'ts', align: 'center', width: 190 },
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
    <div className={!byClientId ? styles.container : ''}>
      {
        !byClientId && (
          <Breadcrumb style={{ marginBottom: 20 }}>
            <Breadcrumb.Item>设备管理</Breadcrumb.Item>
            <Breadcrumb.Item>发布消息列表</Breadcrumb.Item>
          </Breadcrumb>
        )
      }
      <Card bordered={false}>
        {
          !byClientId && (
            <div className={styles.toolbar}>
              <Form style={{ width: '100%' }} layout="inline" form={searchForm}>
                <FormItem label='主题' field='topic'><Input /></FormItem>
                <FormItem label='客户端ID' field='clientId'><Input /></FormItem>
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
          )
        }
        <Table
          borderCell
          rowKey="id"
          loading={{ loading: msgLoading, size: 18, dot: true, element: null }}
          onChange={onChangeTable}
          pagination={pagination}
          // @ts-ignore
          columns={columns}
          data={msgListData?.list}
        />
      </Card>
    </div>
  );
}

export default PbulistMsgList;