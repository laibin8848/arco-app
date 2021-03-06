import React, { useState, useEffect } from 'react';
import { Table, Card, Modal, Badge } from '@arco-design/web-react';
import { useTableQueryGet } from '../../hooks/useTableQuery';

function ConnectLog(props) {
  const { visible, detail = {}, onCancel, justTable } = props;
  const [filter, setFilter] = useState({ current: 1, pageSize: 10, clientId: detail?.clientId });
  const { loading: logLoading, data: logListData } = useTableQueryGet('/admin-backend/connectInfo/listPage', filter);

  function onChangeTable(pagination) {
    const { current , pageSize } = pagination;
    setFilter({ ...filter, current, pageSize });
  }

  useEffect(()=> {
    props.refreshTime && onChangeTable({current: 1, pageSize: 10})
  }, [props.refreshTime])

  const columns = [
    // { title: '客户端ID', dataIndex: 'clientId', width: 130, align: 'center' },
    { title: '协议版本号', dataIndex: 'protoVer', width: 150, align: 'center',
      render: (col, item) => item.type === 'connected' ? `${item.protoName}:${item.protoVer}` : ''
    },
    { title: '类型', dataIndex: 'type', align: 'center', width: 140,
      render: (col, item) => <Badge color={item.type === 'connected' ? 'green' : 'gray'} text={item.type === 'connected' ? '上线' : '下线'} />
    },
    // { title: '用户名', dataIndex: 'username', align: 'center' },
    { title: '下线原因', dataIndex: 'disconnectReason', width: 140, align: 'center' },
    // { title: 'IP', dataIndex: 'ip', align: 'center' },
    // { title: '协议名称', dataIndex: 'protoName', align: 'center' },
    { title: '完整内容', dataIndex: 'remark', align: 'center', ellipsis: true },
    { title: '时间', dataIndex: 'createTime', align: 'center', width: 190 },
  ];

  const pagination = {
    ...filter,
    total: logListData?.total,
    showSizeChanger: true,
    showTotal: (total) => `共 ${total} 条`,
  };

  if(justTable) {
    return (
      <Table
        borderCell
        rowKey="id"
        loading={{ loading: logLoading, size: 18, dot: true, element: null }}
        onChange={onChangeTable}
        pagination={pagination}
        // @ts-ignore
        columns={columns}
        data={logListData?.records}
        scroll={{ x: 900, y: 600 }}
      />
    )
  }

  return (
    <Modal 
      title="连接日志"
      visible={visible} 
      onCancel={onCancel} 
      maskClosable={false}
      footer={null}
      style={{width: '75%'}}
    >
      <Card bordered={false}>
        <Table
          borderCell
          rowKey="id"
          loading={{ loading: logLoading, size: 18, dot: true, element: null }}
          onChange={onChangeTable}
          pagination={pagination}
          // @ts-ignore
          columns={columns}
          data={logListData?.records}
          scroll={{ x: 900, y: 400 }}
        />
      </Card>
    </Modal>
  );
}

export default ConnectLog;