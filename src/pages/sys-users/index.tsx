import React, { useEffect, useState, useRef } from 'react';
import { Table, Button, Input, Breadcrumb, Card } from '@arco-design/web-react';
import request from '../../utils/request';
import styles from './style/index.module.less';
import { IconPlus } from '@arco-design/web-react/icon';

function sysUsers() {
  const columns = [
    { title: '用户ID', dataIndex: 'id' },
    { title: '用户名', dataIndex: 'name' },
    { title: '角色', dataIndex: 'role' },
    { title: '电话号码', dataIndex: 'phone' },
    { title: '创建时间', dataIndex: 'createdTime' },
    {
      title: '操作',
      dataIndex: 'operations',
      width: 150,
      fixed: 'right',
      align: 'center',
      render: () => (
        <div className={styles.operations}>
          <Button type="text" size="mini">
            编辑
          </Button>
          <Button type="text" status="danger" size="mini">
            删除
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    sizeCanChange: true,
    showTotal: true,
    pageSize: 10,
    current: 1,
    pageSizeChangeResetCurrent: true,
    total: 0,
  });
  const [dataLoading, setLoading] = useState(false);
  const searchParsams = useRef({
    username: '',
  });

  function fetchData(current = 1, pageSize = 10, params = {}) {
    setLoading(true);
    request
      .get(`/api/sys/users`, {
        params: {
          page: current,
          pageSize,
          ...params,
        },
      })
      .then((res) => {
        setData(res.data.list);
        setLoading(false);
        setPagination({ ...pagination, current, pageSize, total: res.data.total });
      });
  }

  function onChangeTable(pagination) {
    const { current, pageSize } = pagination;
    fetchData(current, pageSize, { ...searchParsams.current });
  }

  function onSearch(keyword) {
    searchParsams.current.username = keyword;
    fetchData(1, pagination.pageSize, { ...searchParsams.current });
  }

  return (
    <div className={styles.container}>
      <Breadcrumb style={{ marginBottom: 20 }}>
        <Breadcrumb.Item>用户权限管理</Breadcrumb.Item>
        <Breadcrumb.Item>用户列表</Breadcrumb.Item>
      </Breadcrumb>
      <Card bordered={false}>
        <div className={styles.toolbar}>
          <div>
            <Button size="small" type="primary" icon={<IconPlus />}>
              新增用户
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
          loading={{ loading: dataLoading, size: 18, dot: true, element: null }}
          onChange={onChangeTable}
          pagination={pagination}
          scroll={{ x: 1400 }}
          columns={columns}
          data={data}
        />
      </Card>
    </div>
  );
}

export default sysUsers;
