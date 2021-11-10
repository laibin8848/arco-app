import React, { useState, memo } from 'react';
import { Form, Input, Modal, Select } from '@arco-design/web-react';
import { saveUser } from '../../services/users';

const FormItem = Form.Item;

function MenuForm(props) {
  const { visible, detail = {}, onCancel, onOk, ...restProps } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const modalTitle = detail.id ? '编辑菜单' : '新增菜单';

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
      saveUser(values).then(()=> {
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
          <FormItem initialValue={detail.menuName} label='菜单名称' field='menuName' rules={[{ required: true, message: '请输入菜单名称' }]}>
            <Input placeholder='请输入菜单名称' />
          </FormItem>
          <FormItem initialValue={detail.menuCode} label='菜单编码' field='menuCode' rules={[{ required: true, message: '请输入菜单编码' }]}>
            <Input placeholder='请输入菜单编码' />
          </FormItem>
          <FormItem initialValue={detail.url} label='菜单URL' field='url' rules={[{ required: true, message: '请输入菜单URL' }]}>
            <Input placeholder='请输入菜单URL' />
          </FormItem>
          <FormItem initialValue={detail.menuCode} label='菜单类型' field='type' rules={[{ required: true, message: '请选择菜单类型' }]}>
            <Select>
              <Select.Option value="0">目录</Select.Option>
              <Select.Option value="1">菜单</Select.Option>
              <Select.Option value="2">按钮</Select.Option>
            </Select>
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
}

export default memo(MenuForm);
