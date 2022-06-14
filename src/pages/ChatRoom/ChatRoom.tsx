import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import {Button, ListItem, TextField} from '@mui/material';
import {Navigate, useMatch, useNavigate} from 'react-router-dom';
import {getChatroom, getProfileInfo} from '../../services';
import makeToast from '../../helpers/Toaster';

import './styles.scss';

const ChatRoom = (socket: any) => {
  const [messages, setMessages] = useState([]);
  const [roomData, setRoomData]: any = useState('');
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [userId, setUserId] = useState('');
  const [text, setText] = useState('');
  const [myInfo, setMyInfo]: any = useState([]);

  const userIdKey = localStorage.getItem('userId');

  const getProfileApi = useCallback(() => {
    getProfileInfo({}, userIdKey).then((res: any) => {
      setMyInfo(res);
    });
  }, []);

  useEffect(() => {
    getProfileApi()
  },[])

  const navigate = useNavigate();

  const match = useMatch('/chatroom/:id');
  const token = localStorage?.getItem('CC_Token');

  const chatroomId: any = match?.params?.id;

  const getRoomData = async () => {
    await getChatroom(chatroomId).then(res => {
      setRoomData(res);
    });
  };

  const sendMessage = () => {
    if (socket) {
      socket?.socket?.emit('chatroomMessage', {
        chatroomId,
        message: text,
      });
      setText('');
    }
  };

  useEffect(() => {
    if (token && token?.length > 0) {
      const payload = JSON.parse(atob(token?.split('.')[1]));
      setUserId(payload?.id);
    }
  }, [token]);

  useEffect(() => {
    if (socket && token) {
      socket?.socket?.on('newMessage', (message: string) => {
        const newMessages: any = [...messages, message];
        setMessages(newMessages);
      });
    }
  }, [socket, messages, text]);

  useEffect(() => {
    getRoomData();

    if (socket && token) {
      axios
        .get(`http://localhost:8000/messages/${chatroomId}`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('CC_Token'),
          },
        })
        .then((response: any) => {
          setMessages(response?.data);
        })
        .catch(err => {
          makeToast('error', err.response.data.message);
        });
    }
  }, [socket, userId]);

  useEffect(() => {
    if (socket) {
      socket?.socket?.on(`roomIsDeleted`, (event: string) => {
        if (event === 'Room was deleted by owner') {
          makeToast('info', event);
          navigate('/chat-rooms');
        }
      });

      socket?.socket?.on('event', (user: any) => {
        const joinUsers: any = [...users, user];
        setUsers(joinUsers);
      });

      socket?.socket?.on('allUsers', (user: any) => {
        setAllUsers(user?.user);
      });

      socket?.socket?.on('owner', (user: any) => {
        makeToast('info', user);
      });
    }
  }, [socket?.socket?.on, socket]);

  const set = new Set(allUsers);
  const finalUsers = Array.from(set);
  return (
    <div className="chatroomPage">
      <div className="users">
        <p>Users in the room:</p>
        <div className="userContainer">
          {finalUsers?.map((el: string, key: number) => (
            <ListItem className="newUser" key={key}>
              {el}
            </ListItem>
          ))}
        </div>
      </div>
      <div className="chatroomSection">
        {roomData?.data?.map((el: {name: string}, key: number) => (
          <div className="cardHeader" key={key}>
            Chatroom Name: <span>{el?.name}</span>
          </div>
        ))}
        <div className="chatroomContent">
          {messages?.map((message: any, i: number) => (
            <div key={i} className="message">
              <span className={userId === message?.userId ? 'ownMessage' : 'otherMessage'}>
                {message?.name}:
              </span>{' '}
              <p>{message?.message}</p>
            </div>
          ))}
        </div>

        <div className="chatroomActions">
          <div>
            <TextField
              type="text"
              value={text}
              name="message"
              placeholder="Say something!"
              onChange={e => setText(e.target.value)}
            />
          </div>
          <div>
            <Button variant="outlined" className="join" onClick={sendMessage}>
              Send
            </Button>
          </div>
        </div>
      </div>
      {!token && <Navigate to="/auth" />}
      {myInfo[0]?.admin === true && <Navigate to="/" />}

    </div>
  );
};

export default ChatRoom;
