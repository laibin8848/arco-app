import request from "../utils/request";
  
export const deleteCategory = (id) => {
  return request.post(`/admin-backend/clientCategory/delete?id=${id}`)
}

export const updateCategory = (data) => {
  return request.post('/admin-backend/clientCategory/update', data)
}

export const addCategory = (data) => {
  return request.post('/admin-backend/clientCategory/add', data)
}

export const listByParentId = (parentId = 0) => {
  return request.get(`/admin-backend/clientCategory/listByParentId?parentId=${parentId}`)
}

export const listCategoryTree = () => {
  return request.get('/admin-backend/clientCategory/listCategoryTree')
}