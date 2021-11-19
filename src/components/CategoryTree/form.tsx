import React, { useState, memo } from 'react';
import { Form, Input, Modal, Message } from '@arco-design/web-react';
import { addCategory, updateCategory } from '../../services/category';

const FormItem = Form.Item;

function CategoryForm(props) {
  const { visible, detail = {}, onCancel, onOk, ...restProps } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const modalTitle = detail.id ? '编辑分类' : '新增分类';

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
      const postData = { ...detail, ...values };
      const callApi = postData.id ? updateCategory : addCategory;
      setConfirmLoading(true);
      callApi(postData).then(()=> {
        Message.success('分类树刷新……')
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
          <FormItem style={{display: 'none'}} initialValue={detail.parentId} field='parentId'>
            <Input />
          </FormItem>
          <FormItem style={{display: 'none'}} initialValue={detail.id} field='id'>
            <Input />
          </FormItem>
          <FormItem initialValue={detail.categoryName} label='分类名称' field='categoryName' rules={[{ required: true, message: '请输入分类名称' }]}>
            <Input placeholder='请输入分类名称' />
          </FormItem>
          <FormItem initialValue={detail.categoryCode} label='分类编码' field='categoryCode' rules={[{ required: true, message: '请输入分类编码' }]}>
            <Input placeholder='请输入分类编码' />
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
}

export default memo(CategoryForm);
