import request from "../utils/request";

export const deviceAdd = (data) => {
    return request.post('/admin-backend/device', data)
}

export const deviceUpdate = (data) => {
    return request.put('/admin-backend/device', data)
}

export const deviceDtuRelSet = (data) => {
    return request.post('/admin-backend/deviceDtuRel', data)
}

export const deviceDtuRelStatus = (data) => {
    return request.put('/admin-backend/deviceDtuRel', data)
}