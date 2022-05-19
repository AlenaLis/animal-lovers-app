import React, {useState, useCallback, useEffect} from 'react';
import {Link, Navigate} from 'react-router-dom';
import {Button, Menu, MenuItem} from '@mui/material';

import {getAllArticles} from '../../services';
import Fade from '@mui/material/Fade';

import human1 from '../../assets/images/human.png';
import eye from '../../assets/images/eye icon.png';
import question from '../../assets/images/question.png';

import './styles.scss';

const Main = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(6);
  const [myArticle, setMyArticle]: any = useState([]);

  const newArray = myArticle?.slice(startIndex, endIndex);
  const token = localStorage.getItem('CC_Token');

  const goToPreviousPage = () => {
    if (startIndex !== 0) {
      setStartIndex(startIndex - 6);
      setEndIndex(endIndex - 6);
    }
  };

  const getAllArticle = useCallback(() => {
    getAllArticles().then(res => {
      setMyArticle(res);
    });
  }, []);

  useEffect(() => {
    getAllArticle();
  }, []);

  const goToNextPage = () => {
    if (myArticle.length > 6) {
      setStartIndex(startIndex + 6);
      setEndIndex(endIndex + 6);
    }
  };

  let mainArticle = myArticle[0];

  if (myArticle.length > 1) {
    for (let i = 0; i < myArticle.length; i++) {
      if (mainArticle.count < myArticle[i].count) {
        mainArticle = myArticle[i];
      } else {
      }
    }
  } else {
    mainArticle = myArticle[0];
  }

  const [anchorEl, setAnchorEl]: any = React.useState<null | HTMLElement>(null);
  const open: any = Boolean(anchorEl);
  const handleClick: any = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = async (title: string) => {
    console.log(title);
    if (title === 'no filters' || title == '[object Object]') {
      getAllArticles().then(res => {
        setMyArticle(res);
      });
    } else {
      await getAllArticles().then(res => {
        setMyArticle(res?.filter((el: any) => el?.category === `#${title}`));
      });
    }
    setAnchorEl(null);
  };

  const reload = () => {
    window?.location?.reload();
  };

  return (
    <div>
      {myArticle?.length > 0 ? (
        <div className="main">
          <div className="mainTop">
            <div>
              <img
                src={mainArticle?.imageSrc.dataUrl || question}
                alt="Image from the most popular art"
                className="mainArt"
              />
            </div>
            <div className="mainPanel">
              <div className="leftButton">
                <button>{mainArticle?.category}</button>
              </div>
              <div>
                <h2 className="h2Text">
                  <Link to={`/fullart/${mainArticle?._id}/`}>{mainArticle?.title}</Link>
                </h2>
                <p className="pText">
                  <div dangerouslySetInnerHTML={{__html: mainArticle?.textArt}} className="pText" />
                </p>
              </div>
              <div className="mainPanelBottom">
                <div className="mainPanelBottomHuman">
                  <div>
                    <img
                      src={mainArticle?.user?.imageSrc?.dataUrl || human1}
                      alt="User photo"
                      className="mainUserPhoto"
                    />
                  </div>
                  <div>
                    <p className="pHuman">
                      {mainArticle?.user
                        ? mainArticle.user.name + ' ' + mainArticle.user.lastName
                        : ''}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="pHumanSecond">{mainArticle?.data}</p>
                </div>
                <div className="mainPanelBottomHumanSecond">
                  <div>
                    <img src={eye} alt="Eye icon" />
                  </div>
                  <div>
                    <p className="pHumanSecond">{mainArticle?.count}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mainBottom">
            <div>
              <h1 className="h1Main">Popular articles</h1>
            </div>
            <div className="filterContainer">
              <Button
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                Filter
              </Button>
              <Menu
                id="fade-menu"
                MenuListProps={{
                  'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
              >
                <MenuItem onClick={() => handleClose('no filters')} value="no filters">
                  no filters
                </MenuItem>
                <MenuItem onClick={() => handleClose('wild animals')} value="wild animal">
                  wild animals
                </MenuItem>
                <MenuItem onClick={() => handleClose('home pets')} value="home pets">
                  home pets
                </MenuItem>
                <MenuItem onClick={() => handleClose('pets care')} value="pets care">
                  pets care
                </MenuItem>
                <MenuItem onClick={() => handleClose('food for pets')} value="food for pets">
                  food for pets
                </MenuItem>
                <MenuItem
                  onClick={() => handleClose('medicine for animals')}
                  value="medicine for animals"
                >
                  medicine for animals
                </MenuItem>
              </Menu>
            </div>
            {newArray?.map((el: any) => (
              <div className="mainBottomArt">
                <div className="mainBottomNew">
                  <div>
                    <img
                      src={el.imageSrc.dataUrl || question}
                      alt="Image from the article"
                      className="secondArts"
                    />
                  </div>
                  <div className="mainPanelBottomArt">
                    <div>
                      <button> {el.category}</button>
                    </div>
                    <div>
                      <h2 className="h2Text">
                        <Link to={`/fullart/${el._id}/`}>{el.title}</Link>
                      </h2>
                      <p className="pText">
                        <div dangerouslySetInnerHTML={{__html: el.textArt}} className="pText" />
                      </p>
                    </div>
                    <div className="mainPanelBottom">
                      <div className="mainPanelBottomHuman">
                        <div>
                          <img
                            src={el.user.imageSrc?.dataUrl || human1}
                            alt="User's photo"
                            className="userPhoto"
                          />
                        </div>
                        <div>
                          <p className="pHuman">
                            {el.user ? el.user.name + ' ' + el.user.lastName : ''}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="pHumanSecond">{el.data}</p>
                      </div>
                      <div className="mainPanelBottomHumanSecond">
                        <div>
                          <img src={eye} alt="Eye icon" />
                        </div>
                        <div>
                          <p className="pHumanSecond">{el.count}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="bottomButton">
              <div>
                <button className="prevNextButton" onClick={goToPreviousPage}>
                  Prev
                </button>
              </div>
              <div>
                <button className="prevNextButton" onClick={goToNextPage}>
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="noContent">
          <h2 className="h2NoArticles">No articles here</h2>
          <Button onClick={reload}>Reload</Button>
        </div>
      )}
      {!token && <Navigate to="/auth" />}
    </div>
  );
};
export default Main;
