import React, {useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import {io} from 'socket.io-client';

import Auth from './pages/Auth/Auth';
import Header from './components/Header/Header';
import Chats from './pages/Chats/Chats';
import Registration from './pages/Registration/Registration';
import makeToast from './helpers/Toaster';
import ChatRoom from './pages/ChatRoom/ChatRoom';
import Main from './pages/Main/Main';
import CreateArticle from './pages/CreateArticle/CreateArticle';
import ProfileInfo from './pages/ProfileInfo/ProfileInfo';
import FullArticle from './pages/FullArticle/FullArticle';
import MyArticlePage from './pages/MyArticlePage/MyArticlePage';

import './App.css';

const App = () => {
  const [socket, setSocket] = useState(null);

  const setupSocket = () => {
    const token = localStorage?.getItem('CC_Token');

    if (token && !socket) {
      const newSocket: any = io('http://localhost:8000', {
        query: {
          token: localStorage?.getItem('CC_Token'),
        },
      });

      newSocket.on('disconnect', () => {
        setSocket(null);
        setTimeout(setupSocket, 3000);
        makeToast('error', 'Socket Disconnected!');
      });

      newSocket.on('connect', () => {
        makeToast('success', 'Socket Connected!');
      });

      setSocket(newSocket);
    }
  };

  useEffect(() => {
    setupSocket();
  }, []);

  return (
    <div className="App">
      <Header socket={socket} />
      <div className="layout">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/fullart/:id/" element={<FullArticle />} />
          <Route path="/inprof/" element={<MyArticlePage />} />
          <Route path="/profile" element={<ProfileInfo />} />
          <Route path="/create-article" element={<CreateArticle />} />
          <Route path="/chat-rooms" element={<Chats socket={socket} />} />
          <Route path="/auth" element={<Auth setupSocket={setupSocket} />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/chatroom/:id" element={<ChatRoom socket={socket} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
