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

export const publishInfo = (clientId) => {
    return request.post(`/admin-backend/producer/publishInfo?clientId=${clientId}`)
}

export const mqttUserDetail = (id) => {
    return request.get(`/admin-backend/mqttUser/getById?id=${id}`)
}

export const publishTopic = (message, clientId) => {
    return request.post(`/admin-backend/producer/publish`, {
        message,
        topic: `/dtu/order/${clientId}`
    })
}