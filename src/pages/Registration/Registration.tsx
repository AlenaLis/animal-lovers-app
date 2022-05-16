import React, {useState} from 'react';
import {Button, TextField} from '@mui/material';
import {useNavigate} from 'react-router-dom';

import {registration} from '../../services';

import './styles.scss';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const Submit = async () => {
    await registration({
      email,
      password,
      name: login,
    }).then(res => {
      if (res?.statusText === 'OK') {
        navigate('/auth');
      }
    });
  };

  const onSubmit = (event: {preventDefault: () => void}) => {
    event.preventDefault();
    Submit();
  };

  return (
    <div className="registration">
      <form className="form" onSubmit={onSubmit}>
        <TextField
          autoComplete="email"
          id="email"
          label="Enter your email please"
          variant="outlined"
          className="email"
          type="email"
          placeholder="example@.com"
          onChange={e => setEmail(e.target.value)}
          value={email}
          required={true}
        />
        <TextField
          autoComplete="login"
          id="login"
          label="Enter your login please"
          variant="outlined"
          className="login"
          value={login}
          onChange={e => setLogin(e.target.value)}
          required={true}
        />
        <TextField
          id="outlined-basic"
          label="Create your password please"
          variant="outlined"
          className="pass"
          type="password"
          value={password}
          autoComplete="password"
          required={true}
          onChange={e => setPassword(e.target.value)}
        />
        <Button variant="outlined" className="login-button" type="submit">
          Registration
        </Button>
      </form>
    </div>
  );
};

export default Registration;
