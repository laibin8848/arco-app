import request from "../utils/request";

export const getMenuList = (data) => {
    return request.post(`/admin-backend/sys/menu/listByPage?pageNo=${data.pageNo}&pageSize=${data.pageSize}`, data)
  }
  
  export const deleteMenu = (id) => {
    return request.delete('/admin-backend/sys/menu/delete/' + id)
  }
  
  export const deleteMenuBatch = (ids) => {
    return request.delete('/admin-backend/sys/menu/deleteBatch?ids=' + ids)
  }
  
  export const getMenuDetail = (id) => {
    return request.get('/admin-backend/sys/menu/getById/' + id)
  }
  
  export const saveMenu = (data) => {
    return request.post('/admin-backend/sys/menu/save', data)
  }
  
  export const getMenuTree = () => {
    return request.get('/admin-backend/sys/menu/tree')
  }