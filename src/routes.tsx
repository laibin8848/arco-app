import React from 'react';
import { IconList, IconGift } from '@arco-design/web-react/icon';

export const defaultRoute = 'dashboard';

export const routes = [
  {
    name: '监控面板',
    key: 'dashboard',
    icon: <IconGift />,
    componentPath: 'welcome',
  },
  {
    name: '数据列表',
    key: 'devices-list',
    icon: <IconList />,
    children: [
      {
        name: '设备列表',
        key: 'devices-list/list1',
        componentPath: 'search-table',
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
        componentPath: 'search-table',
      },
      {
        name: '菜单管理',
        key: 'system-users/menus',
        componentPath: 'search-table',
      },
      {
        name: '角色管理',
        key: 'system-users/roles',
        componentPath: 'search-table',
      },
    ],
  },
];
