import request from "../utils/request";

export const mqttUserAdd = (data) => {
    return request.post('/admin-backend/mqttUser/add', data)
}

export const mqttUserDelete = (id) => {
    return request.post(`/admin-backend/mqttUser/delete?id=${id}`)
}

export const mqttUserOffline = (clientId) => {
    return request.post(`/admin-backend/mqttUser/offline?clientId=${clientId}`)
}

export const mqttUserUpdate = (data) => {
    return request.post('/admin-backend/mqttUser/update', data)
}

export const addAccountUser = (data) => {
    return request.post('/admin-backend/mqttUser/addAccountUser', data)
}

export const deleteUserAccount = (id) => {
    return request.post(`/admin-backend/mqttUser/deleteUserAccount?id=${id}`)
}

export const updateAccountUser = (data) => {
    return request.post('/admin-backend/mqttUser/updateAccountUser', data)
}