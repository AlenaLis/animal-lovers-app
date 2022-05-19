import React, {useEffect, useState} from 'react';

import {Button} from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';

import './styles.scss';

const Header = (socket: any) => {
  const [auth, setAuth] = useState(false);

  const navigate = useNavigate();
  const token = localStorage?.getItem('CC_Token');

  useEffect(() => {
    if (token && token?.length > 0 && socket) {
      setAuth(true);
    } else {
      setAuth(false);
      navigate('/auth');
    }
  }, [token]);

  const LogOut = () => {
    localStorage?.removeItem('CC_Token');
    window.location.reload();
  };

  return (
    <header className="header">
      <div className="header-left-side">
        <Link to="/" className="link">
          pets care
        </Link>
      </div>

      <div className="header-right-side">
        {!auth ? (
          <div className="wrapper-header">
            <Link to="/auth">
              <Button variant="outlined" className="sign-button">
                Sign In
              </Button>
            </Link>
            <Link to="/registration">
              <Button variant="outlined" className="reg-button">
                Registration
              </Button>
            </Link>
          </div>
        ) : (
          <div className={'loginContent'}>
            <Link to={'/'}>Articles</Link>
            <Link to={'/create-article'}>Create Article</Link>
            <Link to={'/inprof'}>My Articles</Link>
            <Link to={'/profile'}>Profile</Link>
            <Link to={'/chat-rooms'}>Chat Rooms</Link>
            <Link to={'/store'}>Store</Link>
            <Button variant="outlined" className="reg-button" onClick={LogOut}>
              Log Out
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
