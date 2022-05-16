import axios from 'axios';

export const ajaxWrapper = (params: any) => {
  const token = localStorage.getItem('token');
  const defautlHeaders = {
    'Content-Type': 'application/json',
    Authorization: token,
  };

  const headers = {
    ...defautlHeaders,
    ...params.headers,
  };

  return axios({
    headers,
    method: params.method,
    url: params.url,
    data: params.data,
  });
};
