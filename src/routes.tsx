import React from 'react';
import { IconList, IconGift } from '@arco-design/web-react/icon';

export const defaultRoute = 'welcome';

export const routes = [
  {
    name: '监控面板',
    key: 'welcome',
    icon: <IconGift />,
    componentPath: 'welcome',
  },
  {
    name: '数据列表',
    key: 'list',
    icon: <IconList />,
    children: [
      {
        name: '设备列表',
        key: 'list/search-table',
        componentPath: 'search-table',
      },
    ],
  },
];
