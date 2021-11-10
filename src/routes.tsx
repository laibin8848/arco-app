import React from 'react';
import { IconList, IconDesktop, IconSettings, 
  IconRobot, IconStorage, IconUser, IconUserGroup  } from '@arco-design/web-react/icon';

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
    icon: <IconList />,
    children: [
      {
        name: '客户端列表',
        key: 'devices-setting/deviceslist',
        componentPath: 'devices-list',
        icon: <IconRobot />
      },
      {
        name: '数据列表',
        key: 'devices-setting/devices-datalist',
        componentPath: 'search-table',
        icon: <IconStorage />
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
        componentPath: 'search-table',
        icon: <IconStorage />
      },
      {
        name: '角色管理',
        key: 'system-users/roles',
        componentPath: 'search-table',
        icon: <IconUserGroup />
      },
    ],
  },
];
