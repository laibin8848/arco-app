import Mock from 'mockjs';
import setupMock from '../utils/setupMock';

setupMock({
  setup() {
    Mock.XHR.prototype.withCredentials = true;

    // 用户信息
    Mock.mock(new RegExp('/admin-backend/sys/user/getById'), () => {
      return {
        "success":true,
        "code":"E000",
        "message":"成功",
        "data":{
            "adminFlag_dictText":"超级管理员",
            "sex_dictText":"未知",
            "sex":0,
            "mobile":"",
            "updateTime":null,
            "avatar":"",
            "status_dictText":"正常",
            "realName":"超级管理员",
            "userRoles":[
                {
                    "roleId":null,
                    "roleCode":"super_admin",
                    "roleName":"超级管理员",
                    "userId":"0"
                }
            ],
            "userMenus":['dashboard', 'devices-list', 'devices-list/list1', 'system-users', 'system-users/users', 'system-users/menus', 'system-users/roles'],
            "createBy":"",
            "createTime":null,
            "updateBy":"",
            "id":"0",
            "adminFlag":1,
            "email":"",
            "username":"admin",
            "status":1
        },
        "timestamp":1636441541533
      }
    });

    // 登录
    Mock.mock(new RegExp('/admin-backend/login'), (params) => {
      const { username, password } = JSON.parse(params.body);
      if (!username) {
        return {
          "code":"E001",
          "message":"用户名不能为空",
        };
      }
      if (!password) {
        return {
          "code":"E001",
          "message":"用户名不能为空",
        };
      }
      if (username === 'admin' && password === 'admin') {
        return {
          "code":"E000",
          "message":"登录成功",
          "data": {
            token: '123',
            userInfo: {
              userId: '0'
            }
          }
        };
      }
      return {
        "code":"E001",
        "message":"账号或者密码错误",
      };
    });
  },
});
