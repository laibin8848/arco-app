import request from "../utils/request";

export const countClients = () => {
  const promises = [
    request.get('/admin-backend/statics/countAllClients'),
    request.get('/admin-backend/statics/countOnlineClients')
  ];
  return Promise.all(promises)
}

export const countServers = () => {
  const promises = [
    request.get('/admin-backend/statics/countAllServers'),
    request.get('/admin-backend/statics/countOnlineServers')
  ];
  return Promise.all(promises)
}