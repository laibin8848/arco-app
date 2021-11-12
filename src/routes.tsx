import React from 'react';
import { IconList, IconDesktop, 
  IconRobot, IconStorage, IconUser, IconUserGroup, IconSettings, IconCodeSquare  } from '@arco-design/web-react/icon';

export const defaultRoute = 'dashboard';

export const routes = [
  {
    name: '监控面板',
    key: 'dashboard',
    icon: <IconDesktop />,
    componentPath: 'welcome',
  },
  {
    name: '设备管理',
    key: 'devices-setting',
    icon: <IconSettings />,
    children: [
      {
        name: '客户端列表',
        key: 'devices-setting/deviceslist',
        componentPath: 'devices-list',
        icon: <IconRobot />
      },
      {
        name: '发布消息列表',
        key: 'devices-setting/devices-datalist',
        componentPath: 'publish-msg-list',
        icon: <IconStorage />
      },
      {
        name: '登录信息管理',
        key: 'devices-setting/devices-password',
        componentPath: 'devices-password',
        icon: <IconCodeSquare />
      },
    ],
  },
  {
    name: '用户权限管理',
    key: 'system-users',
    icon: <IconList />,
    children: [
      {
        name: '用户管理',
        key: 'system-users/users',
        componentPath: 'sys-users',
        icon: <IconUser />
      },
      {
        name: '菜单管理',
        key: 'system-users/menus',
        componentPath: 'sys-menus',
        icon: <IconStorage />
      },
      {
        name: '角色管理',
        key: 'system-users/roles',
        componentPath: 'sys-roles',
        icon: <IconUserGroup />
      },
    ],
  },
];
