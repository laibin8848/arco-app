import React, { useState, memo } from 'react';
import { Form, Input, Select } from '@arco-design/web-react';
import CustomerModal from '../../components/CustomerModal';

const FormItem = Form.Item;

function SysUserForm() {
  const [formVisable, setVisable] = useState(true);

  const formItemLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
  };
  const [form] = Form.useForm();

  return (
    <div>
      <CustomerModal title='Add User' visible={formVisable} onCancel={() => setVisable(false)}>
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
      </CustomerModal>
    </div>
  );
}

export default memo(SysUserForm);
