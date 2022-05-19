import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Navigate, useNavigate} from 'react-router-dom';
import {Button, TextField} from '@mui/material';

import {deleteChatroom, postChatRoom} from '../../services';

import './styles.scss';

const Chats = (socket: any) => {
  const [auth, setAuth] = useState(false);
  const [update, setUpdate] = useState(false);
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [chatRooms, setChatRooms] = useState([]);

  const token = localStorage?.getItem('CC_Token');
  const navigate = useNavigate();

  useEffect(() => {
    if (token && token?.length > 0) {
      const payload = JSON.parse(atob(token?.split('.')[1]));
      setUserId(payload?.id);
    }
  }, [token, userId]);

  const getChatRooms = async () => {
    if (socket && token) {
      await axios
        .get('http://localhost:8000/chatroom', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('CC_Token'),
          },
        })
        .then(response => {
          setChatRooms(response.data);
          setUpdate(false);
        })
        .catch(() => {
          setUpdate(false);
        });
    }
  };

  const Delete = async (chatroomId: string) => {
    await deleteChatroom(chatroomId).then(() => {
      getChatRooms();

      if (socket) {
        socket?.socket?.emit('roomIsDeleted', chatroomId);
      }
    });
  };

  const postRoom = async () => {
    if (socket && token) {
      await postChatRoom({
        name,
        userId,
      }).then(res => {
        if (res?.statusText === 'OK') {
          setUpdate(true);
          setName('');
        }
      });
    }
  };

  const JoinRoom = (chatroomId: string, id: string) => {
    if (socket) {
      socket?.socket?.emit('joinRoom', chatroomId, id);

      navigate(`/chatroom/` + `${chatroomId}`);
    }
  };

  useEffect(() => {
    if (token && token?.length > 0) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [token]);

  useEffect(() => {
    getChatRooms();
  }, []);

  useEffect(() => {
    if (update) {
      getChatRooms();
    }
  }, [update, chatRooms]);

  return (
    <div className="chats">
      {auth && socket ? (
        <div className="card">
          <div className="cardHeader">Rooms for chat</div>
          <div className="cardBody">
            <div className="inputGroup">
              <TextField
                id="outlined-basic"
                label="Enter new room name"
                variant="outlined"
                className="roomInput"
                type="text"
                value={name}
                required={true}
                onChange={e => setName(e.target.value)}
              />
            </div>
          </div>
          <Button className="create" variant="outlined" onClick={postRoom}>
            Create Chatroom
          </Button>
          <div className="chatRooms">
            {chatRooms?.map((chatroom: {_id: string; name: string; userId: string}) => (
              <div className="room" key={chatroom?._id}>
                <span>join</span>
                <Button onClick={() => JoinRoom(chatroom?._id, userId)}>'{chatroom?.name}'</Button>
                <span>room</span>
                {chatroom?.userId === userId && (
                  <Button onClick={() => Delete(chatroom?._id)}>Delete</Button>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Please Log In to use Time Messenger</p>
      )}
      {!token && <Navigate to="/auth" />}
    </div>
  );
};

export default Chats;
