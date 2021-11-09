import React, { useState, memo } from 'react';
import { Form, Input, Select, Modal } from '@arco-design/web-react';

const FormItem = Form.Item;

function SysUserForm(props) {
  const { visible, detail = {}, onCancel, onOk, ...restProps } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const modalTitle = detail === {} ? '新增用户' : '编辑用户';

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
    setConfirmLoading(true)
    form.validate().then(res => {
      setConfirmLoading(false)
      onOk()
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
      >
        <Form
          {...formItemLayout}
          form={form}
          labelCol={{ style: { flexBasis: 80 } }}
          wrapperCol={{ style: { flexBasis: 'calc(100% - 80px)' } }}
        >
          <FormItem label='Name' field='name' rules={[{ required: true }]}>
            <Input placeholder='' />
          </FormItem>
          <FormItem label='Gender' required field='sex' rules={[{ required: true }]}>
            <Select options={['男', '女']} />
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
}

export default memo(SysUserForm);
