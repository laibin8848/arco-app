import { Form, Input, Checkbox, Link, Button, Space } from '@arco-design/web-react';
import { IconLock, IconUser } from '@arco-design/web-react/icon';
import React, { useEffect, useState } from 'react';
import request from '../../utils/request';
import styles from './style/index.module.less';
import history from '../../history';
import Captcha from '../../components/Captcha';

export default function LoginForm() {
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(false);

  function afterLoginSuccess(params) {
    // 记住密码
    if (rememberPassword) {
      localStorage.setItem('loginParams', JSON.stringify(params));
    } else {
      localStorage.removeItem('loginParams');
    }
    // 记录登录状态
    localStorage.setItem('userStatus', 'login');
    // 跳转首页
    window.location.href = history.createHref({
      pathname: '/',
    });
  }

  function login(params) {
    setErrorMessage('');
    setLoading(true);
    request.post('/admin-backend/login', params).then(() => {
      afterLoginSuccess(params);
    }).finally(() => {
      setLoading(false);
    });
  }

  function onSubmit(values) {
    login(values);
  }

  // 读取 localStorage，设置初始值
  useEffect(() => {
    const params = localStorage.getItem('loginParams');
    const rememberPassword = !!params;
    setRememberPassword(rememberPassword);
    if (form && rememberPassword) {
      const parseParams = JSON.parse(params);
      form.setFieldsValue(parseParams);
    }
  }, []);

  const setCheckKey = (value: string)=> {
    form.setFieldsValue({
      checkKey: value
    });
  };

  return (
    <div className={styles['login-form-wrapper']}>
      <div className={styles['login-form-title']}>登录 IOT Platform</div>
      <div className={styles['login-form-error-msg']}>{errorMessage}</div>
      <Form className={styles['login-form']} layout="vertical" form={form} onSubmit={onSubmit}>
        <Form.Item field="checkKey" style={{display: 'none'}}>
          <Input />
        </Form.Item>
        <Form.Item field="username" rules={[{ required: true, message: '用户名不能为空' }]}>
          <Input prefix={<IconUser />} placeholder="用户名：admin" />
        </Form.Item>
        <Form.Item field="password" rules={[{ required: true, message: '密码不能为空' }]}>
          <Input.Password
            prefix={<IconLock />}
            placeholder="密码：admin"
          />
        </Form.Item>
        <Form.Item field="captcha" rules={[{ required: true, message: '验证码不能为空' }]}>
          <Input placeholder="请输入验证码" />
        </Form.Item>
        <Captcha captchaReady={setCheckKey} />
        <Space size={16} direction="vertical">
          <div className={styles['login-form-password-actions']}>
            <Checkbox checked={rememberPassword} onChange={setRememberPassword}>
              记住密码
            </Checkbox>
            <Link>忘记密码？</Link>
          </div>
          <Button type="primary" long htmlType="submit" loading={loading}>
            登录
          </Button>
          <Button type="text" long className={styles['login-form-register-btn']}>
            注册账号
          </Button>
        </Space>
      </Form>
    </div>
  );
}
