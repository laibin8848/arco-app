import React, { useState, memo } from 'react';
import { Form, Input, Modal } from '@arco-design/web-react';
import { saveRole } from '../../services/roles';
import MenuTree from '../../components/MenuTree';

const FormItem = Form.Item;

function SysRoleForm(props) {
  const { visible, detail = {}, onCancel, onOk, ...restProps } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const modalTitle = detail.id ? '编辑角色' : '新增角色';

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
      saveRole(values).then(()=> {
        onOk();
      }).finally(()=> {
        setConfirmLoading(false);
      });
    })
  }

  function setMenuIds(checkedKeys) {
    form.setFieldValue('menuIds', checkedKeys);
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
          <FormItem initialValue={detail.id} field='id' style={{display: 'none'}}>
            <Input />
          </FormItem>
          <FormItem initialValue={detail.roleCode} label='标识' field='roleCode' rules={[{ required: true, message: '请输入标识' }]}>
            <Input placeholder='请输入标识' />
          </FormItem>
          <FormItem initialValue={detail.roleName} label='角色名' field='roleName' rules={[{ required: true, message: '请输入角色名' }]}>
            <Input placeholder='请输入角色名' />
          </FormItem>
          <FormItem initialValue={detail.description} label='描述' field='description' rules={[{ required: true, message: '请输入描述' }]}>
            <Input.TextArea rows={3} placeholder='请输入描述' />
          </FormItem>
          <FormItem initialValue={detail.menuIds} label='菜单权限' field='menuIds' rules={[{ required: true, message: '请选择菜单权限' }]}>
            <MenuTree 
              height="500px"
              showLine 
              checkable 
              onCheck={setMenuIds} 
              defaultCheckedKeys={detail.menuIds || []} 
            />
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
}

export default memo(SysRoleForm);
