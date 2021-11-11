import request from "../utils/request";

export const mqttUserAdd = (data) => {
    return request.post('/admin-backend/mqttUser/add', data)
}

export const mqttUserDelete = (id) => {
    return request.post(`/admin-backend/mqttUser/delete?id=${id}`)
}

export const mqttUserOffline = (id) => {
    return request.post(`/admin-backend/mqttUser/offline?id=${id}`)
}

export const mqttUserUpdate = (data) => {
    return request.post('/admin-backend/mqttUser/update', data)
}