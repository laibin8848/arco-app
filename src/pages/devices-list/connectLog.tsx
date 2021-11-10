import React, { useState } from 'react';
import { Table, Card, Modal } from '@arco-design/web-react';
import { useTableQueryGet } from '../../hooks/useTableQuery';

function ConnectLog(props) {
  const { visible, detail = {}, onCancel } = props;
  const [filter, setFilter] = useState({ current: 1, pageSize: 10, clientId: detail?.id });
  const { loading: logLoading, data: logListData } = useTableQueryGet('/admin-backend/connectInfo/listPage', filter);

  function onChangeTable(pagination) {
    const { current , pageSize } = pagination;
    setFilter({ ...filter, current, pageSize });
  }

  const columns = [
    { title: '客户端ID', dataIndex: 'clientId', width: 90, align: 'center' },
    { title: '用户名', dataIndex: 'username', align: 'center' },
    { title: '下线原因', dataIndex: 'disconnectReason', align: 'center' },
    { title: 'IP', dataIndex: 'ip', align: 'center' },
    { title: '协议名称', dataIndex: 'protoName', align: 'center' },
    { title: '协议版本号', dataIndex: 'protoVer', align: 'center' },
    { title: '完整内容', dataIndex: 'remark', align: 'center', width: 200, ellipsis: true },
    { title: '类型', dataIndex: 'type', align: 'center' },
  ];

  const pagination = {
    ...filter,
    total: logListData?.total,
    showSizeChanger: true,
    showTotal: (total) => `共 ${total} 条`,
  };

  return (
    <Modal 
      title="连接日志"
      visible={visible} 
      onCancel={onCancel} 
      maskClosable={false}
      footer={null}
      style={{width: '60%'}}
    >
      <Card bordered={false}>
        <Table
          borderCell
          rowKey="id"
          loading={{ loading: logLoading, size: 18, dot: true, element: null }}
          onChange={onChangeTable}
          pagination={pagination}
          columns={columns}
          data={logListData?.records}
          scroll={{y: 400}}
        />
      </Card>
    </Modal>
  );
}

export default ConnectLog;