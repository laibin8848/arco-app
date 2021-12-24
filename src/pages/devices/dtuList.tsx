import React, { useState } from 'react';
import { Table, Button, Input, Card, Form, Space, Select, Badge } from '@arco-design/web-react';
import styles from './style/index.module.less';
import { useTableQueryGet } from '../../hooks/useTableQuery';
// import { deviceDtuRelStatus } from '../../services/devices';

interface SysuserFilter {
  current: number;
  pageSize: number;
  username?: string;
};
const FormItem = Form.Item;
const Option = Select.Option;

function DtuList(props) {
  const [filter, setFilter] = useState<SysuserFilter>({ current: 1, pageSize: 10 });
  const { loading: userLoading, data: userListData } = useTableQueryGet('/admin-backend/mqttUser/listDtuBindPage', filter);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  function onChangeTable(pagination) {
    const { current , pageSize } = pagination;
    setFilter({ ...filter, current, pageSize });
  }

  // function dutStatus(row) {
  //   Modal.confirm({
  //     title: '确定继续操作？',
  //     onOk: ()=> {
  //       deviceDtuRelStatus({
  //         deviceId: row.deviceId,
  //         dtuId: row.dtuId,
  //         status: 0
  //       }).then(()=> {
  //         doSearchForm();
  //       })
  //     }
  //   });
  // }

  const columns = [
    { title: '客户端ID', dataIndex: 'clientId', width: 160, align: 'center' },
    { title: '设备名', dataIndex: 'deviceName' },
    { title: '连接状态', dataIndex: 'dtuStatus', align: 'center',width: 100,
      render: (col, item) => <Badge color={item.dtuStatus === 'connected' ? 'green' : 'gray'} text={item.dtuStatus === 'connected' ? '在线' : '离线'} />
    },
    // {
    //   title: '操作',
    //   dataIndex: 'operations',
    //   width: 80,
    //   fixed: 'right',
    //   align: 'center',
    //   ellipsis: true,
    //   render: (col, item) => (
    //     item.deviceId && (
    //       <Button className="operations-btn" type="text" size="mini" onClick={()=> {dutStatus(item)}}>解绑</Button>
    //     )
    //   ),
    // },
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
    <Card bordered={false} style={{overflow: 'hidden'}}>
      <div className={styles.toolbar}>
        <Form style={{ width: '100%' }} layout="inline" form={searchForm}>
          <FormItem label='ClientId：' field='clientId'><Input /></FormItem>
          <FormItem label='连接状态：' field='connectStatus'>
            <Select>
              <Option value="">所有</Option>
              <Option value="connected">在线</Option>
              <Option value="disconnected">离线</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Space>
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
        rowKey="dtuId"
        loading={{ loading: userLoading, size: 18, dot: true, element: null }}
        onChange={onChangeTable}
        pagination={pagination}
        // @ts-ignore
        columns={columns}
        data={userListData?.records}
        rowSelection={{
          type: "radio",
          selectedRowKeys,
          onChange: (selectedRowKeys, selectedRows) => {
            props?.onDtuSel && props.onDtuSel(selectedRows[0]);
            setSelectedRowKeys(selectedRowKeys);
          },
          checkboxProps: (record) => {
            return {
              disabled: record.deviceId,
            };
          }
        }}
      />
    </Card>
  );
}

export default DtuList;