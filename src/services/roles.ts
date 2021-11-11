import request from "../utils/request";

export const getRoleList = (data) => {
    return request.post('/admin-backend/sys/role/listByPage', data)
  }
  
  export const delRole = (row) => {
    return request.delete(`/admin-backend/sys/role/delete/${row.id}`)
  }
  
  export const getRole = (id) => {
    return request.get(`/admin-backend/sys/role/getById/${id}`)
  }
  
  export const saveRole = (data) => {
    return request.post('/admin-backend/sys/role/save', data)
  }
  
  export const allRoleList = (data = {}) => {
    return request.post('/admin-backend/sys/role/list', data)
  }
