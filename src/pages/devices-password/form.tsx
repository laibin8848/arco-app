import React, { useState, memo } from 'react';
import { Form, Input, Modal } from '@arco-design/web-react';
import { addAccountUser, updateAccountUser } from '../../services/devices';

const FormItem = Form.Item;

function PwdForm(props) {
  const { visible, detail = {}, onCancel, onOk, ...restProps } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const modalTitle = detail.id ? '编辑账号' : '新增账号';

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
      const callApi = detail.id ? updateAccountUser : addAccountUser;
      callApi(values).then(()=> {
        onOk();
      }).finally(()=> {
        setConfirmLoading(false);
      });
    })
  }

  return (
    <div>
      <Modal 
        {...restProps}
        title={modalTitle}
        visible={visible} 
        onCancel={onCancel} 
        onOk={_onOk} 
        confirmLoading={confirmLoading}
        maskClosable={false}
      >
        <Form
          {...formItemLayout}
          form={form}
          labelCol={{ style: { flexBasis: 100 } }}
          wrapperCol={{ style: { flexBasis: 'calc(100% - 100px)' } }}
        >
          <FormItem style={{display: 'none'}} initialValue={detail.id} field='id'>
            <Input />
          </FormItem>
          <FormItem disabled={detail.id} initialValue={detail.username} label='用户名' field='username' rules={[{ required: true, message: '请输入用户名' }]}>
            <Input placeholder='请输入用户名' />
          </FormItem>
          <FormItem label='密码' field='password' rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password placeholder='请输入密码' />
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
}

export default memo(PwdForm);
