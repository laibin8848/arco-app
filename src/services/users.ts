import request from "../utils/request";

export const deleteUser = (id) => {
    return request.delete('/admin-backend/sys/user/delete/' + id)
}

export const saveUser = (data) => {
    return request.post('/admin-backend/sys/user/save', data)
}

export const deleteUserBatch = (ids) => {
    return request.delete('/admin-backend/sys/user/deleteBatch?ids=' + ids)
}

export const roleSaveBatch = (data) => {
    return request.post('/admin-backend/sys/user-role/saveBatch', data)
}

export const getUserRoles = (data) => {
    return request.post('/admin-backend/sys/user-role/list', data)
}

export const deleteRoleBatch = (ids) => {
  if(!ids) {
    return Promise.resolve(true)
  }
  return request.delete('/admin-backend/sys/user-role/deleteBatch?ids=' + ids)
}

export const userChangePassword = (data) => {
    return request.post('/admin-backend/sys/user/changePassword', data)
}
