import React, { useState, memo } from 'react';
import { Form, Input, Modal, Message } from '@arco-design/web-react';
import { userChangePassword } from '../../services/users';

const FormItem = Form.Item;

function ChangePassword(props) {
  const { visible, onCancel, onOK, detail = {}, ...restProps } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);

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
      setConfirmLoading(true)
      userChangePassword(values).then(()=> {
        Message.success('密码修改成功！');
        onOK();
      }).finally(()=> {
        setConfirmLoading(false);
      })
    })
  }

  return (
    <div>
      <Modal 
        {...restProps}
        title="密码修改"
        visible={visible} 
        onCancel={onCancel} 
        onOk={_onOk} 
        confirmLoading={confirmLoading}
        maskClosable={false}
      >
        <Form
          {...formItemLayout}
          form={form}
          labelCol={{ style: { flexBasis: 120 } }}
          wrapperCol={{ style: { flexBasis: 'calc(100% - 120px)' } }}
        >
          <FormItem style={{display: 'none'}} initialValue={detail.username} field='username'>
            <Input />
          </FormItem>
          <FormItem label='旧密码' field='oldPassword' rules={[{ required: true, message: '请输入旧密码' }]}>
            <Input placeholder='请输入旧密码' />
          </FormItem>
          <FormItem label='新密码' field='newPassword' rules={[{ required: true, message: '请输入新密码' }]}>
            <Input placeholder='请输入新密码' />
          </FormItem>
          <FormItem label='确认新密码' field='passwordConfirm' rules={[{ required: true, message: '请确认新密码' }, { 
            validator(value, cb) {
              if (value !== form.getFieldValue('newPassword')) {
                return cb('两次输入的密码不一致')
              }
              return cb()
            }
           }]}>
            <Input placeholder='请输入确认新密码' />
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
}

export default memo(ChangePassword);
