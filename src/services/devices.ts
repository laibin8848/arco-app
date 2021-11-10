import request from "../utils/request";

export const mqttUserAdd = (data) => {
    return request.post('/admin-backend/mqttUser/add', data)
}

export const mqttUserDelete = (data) => {
    return request.post('/admin-backend/mqttUser/delete', data)
}

export const mqttUserOffline = (data) => {
    return request.post('/admin-backend/mqttUser/offline', data)
}

export const mqttUserUpdate = (data) => {
    return request.post('/admin-backend/mqttUser/update', data)
}