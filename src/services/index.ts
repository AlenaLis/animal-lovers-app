import {ajaxWrapper} from '../helpers/ajaxWrapper';
import makeToast from '../helpers/Toaster';

import {urls} from '../helpers/constant';

export const login = (data: {email: string; password: string}) => {
  const url = `${urls.USER}/login`;
  return ajaxWrapper({
    method: 'POST',
    url,
    data,
  })
    .then(res => {
      makeToast('success', res.data.message);
      return res;
    })
    .catch(err => {
      if (err && err.response && err.response.data && err.response.data.message)
        makeToast('error', err.response.data.message);
      return err.response;
    });
};

export const registration = (data: {email: string; password: string; name: string}) => {
  const url = `${urls.USER}/register`;
  return ajaxWrapper({
    method: 'POST',
    url,
    data,
  })
    .then(res => {
      makeToast('success', res.data.message);
      return res;
    })
    .catch(err => {
      if (err && err.response && err.response.data && err.response.data.message)
        makeToast('error', err.response.data.message);
      return err.response;
    });
};

export const postChatRoom = (data: {name: string; userId: string}) => {
  const url = `${urls.CHATROOM}`;
  return ajaxWrapper({
    method: 'POST',
    url,
    data,
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('CC_Token'),
    },
  })
    .then(res => {
      makeToast('success', res.data.message);
      return res;
    })
    .catch(err => {
      if (err && err.response && err.response.data && err.response.data.message)
        makeToast('error', err.response.data.message);

      return err.response;
    });
};

export const getChatroom = (data: string) => {
  const url = `${urls.CHATROOM}/${data}`;
  return ajaxWrapper({
    method: 'GET',
    url,
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('CC_Token'),
    },
  })
    .then(res => {
      return res;
    })
    .catch(err => {
      if (err && err.response && err.response.data && err.response.data.message)
        return err.response;
    });
};

export const deleteChatroom = (data: string) => {
  const url = `${urls.CHATROOM}/${data}`;
  return ajaxWrapper({
    method: 'DELETE',
    url,
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('CC_Token'),
    },
  })
    .then(res => {
      makeToast('success', 'Room was deleted');

      return res;
    })
    .catch(err => {
      makeToast('error', 'Room cant to be deleted');
      if (err && err.response && err.response.data && err.response.data.message)
        return err.response;
    });
};
