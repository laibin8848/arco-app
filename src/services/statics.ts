import request from "../utils/request";

export const countAllClients = () => {
  return request.get('/admin-backend/statics/countAllClients')
}

export const countOnlineClients = () => {
  return request.get('/admin-backend/statics/countOnlineClients')
}