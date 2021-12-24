import React, { useState, memo } from 'react';
import { Form, Input, Modal, Tabs, Message } from '@arco-design/web-react';
import { deviceAdd, deviceUpdate, deviceDtuRelSet } from '../../services/devices';
import { CategoryTreeSelect } from '../../components/CategoryTree';
import DtuList from './dtuList';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

function ClientForm(props) {
  const { visible, detail = {}, onCancel, onOk, ...restProps } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const modalTitle = detail.id ? '修改设备' : '新增设备';

  const formItemLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
  };
  const [form] = Form.useForm();

  const _onOk = () => {
    form.validate().then(values => {
      setConfirmLoading(true);
      const callApi = detail.deviceId ? deviceUpdate : deviceAdd;
      detail.deviceId && (values.status = detail.status);
      callApi(values).then((res)=> {
        if(!detail.id && values.dtuId && res.data.id) {
          deviceDtuRelSet({
            deviceId: res.data.id,
            dtuId: values.dtuId,
            status: 1
          }).then(()=> {
            Message.success('成功绑定DTU！');
            onOk();
          });
        }
        onOk();
      }).finally(()=> {
        setConfirmLoading(false);
      });
    })
  }

  return (
    <div>
      <Modal 
        style={{width: '45%'}}
        {...restProps}
        title={modalTitle}
        visible={visible} 
        onCancel={onCancel} 
        onOk={_onOk} 
        confirmLoading={confirmLoading}
        maskClosable={false}
      >
        <Tabs>
          <TabPane key='base' title='基本信息'>
            <Form
              {...formItemLayout}
              form={form}
              labelCol={{ style: { flexBasis: 100 } }}
              wrapperCol={{ style: { flexBasis: 'calc(100% - 100px)' } }}
            >
              <FormItem style={{display: 'none'}} label='id' initialValue={detail.deviceId} field='id'>
                <Input />
              </FormItem>
              <FormItem label='设备名' rules={[{ required: true, message: '请输入设备名' }]} initialValue={detail.deviceName} field='deviceName'>
                <Input />
              </FormItem>
              <FormItem label='DTU' field='dtuId' style={{display: detail.deviceId ? 'none' : ''}}>
                <Input disabled />
              </FormItem>
              <FormItem label='分类' rules={[{ required: true, message: '请选择分类' }]} initialValue={detail.categoryId} field='categoryId'>
                <CategoryTreeSelect defaultValue={detail.categoryId || ''} onChange={val => form.setFieldValue('categoryId', val)} />
              </FormItem>
              <FormItem initialValue={detail.remark} label='设备信息' field='remark'>
                <Input.TextArea rows={4} placeholder='请输入设备信息' />
              </FormItem>
            </Form>
          </TabPane>
          {
            !detail.deviceId && (
              <TabPane key='dtu' title='选择DTU'>
                <DtuList onDtuSel={(row)=> { form.setFieldValue('dtuId', row.dtuId || '') }} />
              </TabPane>
            )
          }
        </Tabs>
      </Modal>
    </div>
  );
}

export default memo(ClientForm);
