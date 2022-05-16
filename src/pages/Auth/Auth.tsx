import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button, TextField} from '@mui/material';

import {login} from '../../services';

import './styles.scss';

const Auth = (setupSocket: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const setPersons = async () => {
    await login({
      email,
      password,
    }).then(res => {
      if (res?.statusText === 'OK') {
        localStorage.setItem('CC_Token', res.data.token);
        setupSocket.setupSocket();
        navigate('/chat-rooms');
      }
    });
  };

  const checkPerson = (event: {preventDefault: () => void}) => {
    event.preventDefault();
    setPersons();
  };

  return (
    <div className="auth">
      <form className="form" onSubmit={checkPerson}>
        <TextField
          id="email"
          label="Enter your email please"
          variant="outlined"
          className="email"
          type="email"
          placeholder="example@.com"
          onChange={e => setEmail(e.target.value)}
          required={true}
        />
        <TextField
          id="password"
          label="Enter your password please"
          variant="outlined"
          className="password"
          type="password"
          onChange={e => setPassword(e.target.value)}
          required={true}
        />
        <Button variant="outlined" className="login-button" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Auth;
