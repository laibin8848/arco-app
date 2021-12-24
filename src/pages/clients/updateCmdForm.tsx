import React, { useState, memo } from 'react';
import { Form, Input, Modal, Message } from '@arco-design/web-react';
import { publishTopic } from '../../services/clients';

const FormItem = Form.Item;

function UpdateCmdForm(props) {
  const { visible, detailId, onCancel, onOk, ...restProps } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);

  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 18,
    },
  };
  const [form] = Form.useForm();

  const _onOk = () => {
    form.validate().then(values => {
      setConfirmLoading(true);
      const message = `{type: "setcmd", data: "${values.data}",  repeat: ${values.repeat}}`;
      publishTopic(message, detailId).then(()=> {
        Message.success('指令发送成功！');
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
        title="更新指令"
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
          <FormItem label='内容' rules={[{ required: true, message: '请输入内容' }]} field='data'>
            <Input.TextArea rows={4} placeholder='请输入内容' />
          </FormItem>
          <FormItem label='重复时间' rules={[{ required: true, message: '请输入重复时间' }]} field='repeat'>
            <Input type="number" placeholder='重复时间(毫秒)' />
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
}

export default memo(UpdateCmdForm);
