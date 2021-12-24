import React, { useState, useRef, useEffect } from 'react';
import { Table, Button, Input, Breadcrumb, Card, Form, Space, Select, Badge, Tag, Modal, Message } from '@arco-design/web-react';
import { IconPlus } from '@arco-design/web-react/icon';
import styles from './style/index.module.less';
import ClientForm from './form';
import useOpenModal from '../../hooks/useOpenModal';
import { useTableQueryGet } from '../../hooks/useTableQuery';
import CategoryTree from '../../components/CategoryTree';
import DtuList from './dtuList';
import { deviceDtuRelSet, deviceDtuRelStatus } from '../../services/devices';

interface SysuserFilter {
  current: number;
  pageSize: number;
  username?: string;
  categoryId?: string;
};
const FormItem = Form.Item;
const Option = Select.Option;

function DevicesList() {
  const [filter, setFilter] = useState<SysuserFilter>({ current: 1, pageSize: 10 });
  const { loading: userLoading, data: userListData } = useTableQueryGet('/admin-backend/device/listPage', filter);

  const [cate, setCate] = useState([]);
  const curCate = useRef('');

  function onChangeTable(pagination) {
    const { current , pageSize } = pagination;
    setFilter({ ...filter, current, pageSize });
  }

  function showDtuList(props) {
    const { visible, onCancel, onOk, deviceId } = props;
    const selDtuId = useRef('');

    function __changeDtu() {
      if(!selDtuId.current) {
        Message.success('请选择DTU！');
        return;
      }
      deviceDtuRelSet({
        deviceId,
        dtuId: selDtuId.current,
        status: 1

      }).then(()=> {
        Message.success('成功绑定DTU！');
        onOk();
      })
    }

    return (
      <Modal onOk={__changeDtu} title="DTU列表" visible={visible} style={{width: '50%'}} onCancel={onCancel}>
        <DtuList onDtuSel={(row)=> { selDtuId.current = row ? row.dtuId || '' : ''; }} />
      </Modal>
    )
  }

  function dutStatus(row) {
    Modal.confirm({
      title: '确定继续操作？',
      onOk: ()=> {
        deviceDtuRelStatus({
          deviceId: row.deviceId,
          dtuId: row.dtuId || '',
          status: 0
        }).then(()=> {
          doSearchForm();
        })
      }
    });
  }

  const columns = [
    { title: '设备名', dataIndex: 'deviceName' },
    { title: 'DTU状态', dataIndex: 'status', align: 'center',width: 100,
      render: (col, item) => <Badge color={item.status === 1 ? 'green' : 'gray'} text={item.connectStatus === 1 ? '在线' : '离线'} />
    },
    {
      title: '操作',
      dataIndex: 'operations',
      align: 'center',
      ellipsis: true,
      width: 140,
      render: (col, item) => (
        <div>
          <Button className="operations-btn" type="text" size="mini" onClick={()=> {useOpenModal(ClientForm, { onOk: doSearchForm, detail: item})}}>修改</Button>
          {
            item.dtuId && (
              <Button className="operations-btn" type="text" size="mini" onClick={()=> {dutStatus(item)}}>解绑</Button>
            )
          }
          {
            !item.dtuId && (
              <Button className="operations-btn" type="text" size="mini" onClick={()=> {useOpenModal(showDtuList, { deviceId: item.deviceId })}}>更换dtu</Button>
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

  useEffect(()=> {
    cate[0] &&
      setFilter({...filter, categoryId: cate[0]})
  }, [cate])

  return (
    <div className={styles.container}>
      <Breadcrumb style={{ marginBottom: 20 }}>
        <Breadcrumb.Item>设备管理</Breadcrumb.Item>
        <Breadcrumb.Item>iot设备管理</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{display: 'flex'}}>
        <Card bordered={false} style={{marginRight: 6}}>
          <CategoryTree showLine editable style={{width: 380}} selectable selectedKeys={cate} onSelect={
            (sel, {selectedNodes})=> {
              curCate.current = selectedNodes[0] ? selectedNodes[0].props.title || '' : '';
              setCate(sel)
            }
          }/>
        </Card>
        <Card bordered={false} style={{overflow: 'hidden'}}>
          <div className={styles.toolbar}>
            <Form style={{ width: '100%' }} layout="inline" form={searchForm}>
              <FormItem label='设备名：' field='deviceName'><Input /></FormItem>
              <FormItem label='设备状态：' field='status'>
                <Select>
                  <Option value="">所有</Option>
                  <Option value="connected">在线</Option>
                  <Option value="disconnected">离线</Option>
                </Select>
              </FormItem>
              <FormItem>
                <Space>
                  <Button size="small" type="primary" icon={<IconPlus />} onClick={()=> {useOpenModal(ClientForm, { onOk: doSearchForm })}}>
                    新增设备
                  </Button>
                  <Button size="small" type="secondary" onClick={()=> {doSearchForm(true)}}>
                    重置
                  </Button>
                  <Button size="small" type="primary" onClick={()=> {doSearchForm()}}>
                    查询
                  </Button>
                  {
                    filter.categoryId && (
                      <Tag color="#ff7d00" closable onClose={()=> {
                        setCate(['']);
                        setFilter({...filter, categoryId: ''});
                      }}>当前分类：{curCate.current}</Tag>
                    )
                  }
                </Space>
              </FormItem>
            </Form>
          </div>
          <Table
            borderCell
            rowKey="deviceId"
            loading={{ loading: userLoading, size: 18, dot: true, element: null }}
            onChange={onChangeTable}
            pagination={pagination}
            // @ts-ignore
            columns={columns}
            data={userListData?.records}
          />
        </Card>
      </div>
    </div>
  );
}

export default DevicesList;