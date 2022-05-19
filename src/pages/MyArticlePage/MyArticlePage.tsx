import React, {useCallback, useEffect, useState} from 'react';
import {Link, Navigate} from 'react-router-dom';

import {getOneArticle, getProfileInfo} from '../../services';

import question from '../../assets/images/question.png';
import human1 from '../../assets/images/human.png';
import eye from '../../assets/images/eye icon.png';
import prof from '../../assets/images/prof_photo.png';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './styles.scss';

const MyArticlePage = () => {
  const [myInfo, setMyInfo]: any = useState([]);
  const [myArticle, setMyArticle]: any = useState([]);

  const token = localStorage.getItem('CC_Token');
  const userId = localStorage.getItem('userId');

  const getProfileApi = useCallback(() => {
    getProfileInfo({}, userId).then((res: any) => {
      setMyInfo(res);
    });
  }, []);

  const myArticles = useCallback(() => {
    getOneArticle({}, userId).then((res: any) => {
      setMyArticle(res);
    });
  }, []);

  useEffect(() => {
    getProfileApi();
  }, []);

  useEffect(() => {
    myArticles();
  }, []);

  return (
    <div className="profArtContainer">
      {myArticle && myArticle.length > 0 ? (
        <div className="inProfContainer">
          <div className="profContPhoto">
            {myInfo && myInfo.length > 0 ? (
              <span className="line">
                <div>
                  <img
                    src={myInfo[0].imageSrc?.dataUrl || prof}
                    alt="User photo"
                    className="mainUserPhoto"
                  />
                </div>
                <div>
                  <h3>{myInfo[0].name ? myInfo[0].name + ' ' + myInfo[0].lastName : ' '}</h3>
                </div>
                <div>
                  <p>{myInfo[0].description ? myInfo[0].description : ''}</p>
                </div>
              </span>
            ) : (
              ''
            )}
          </div>
          <div className="coloumContent">
            {myArticle?.map((el: any) => (
              <div className="profContArt">
                <div className="mainBottomArtPage">
                  <div className="mainBottomNewPage">
                    <div>
                      <img
                        src={el.imageSrc.dataUrl || question}
                        alt="Image from the art"
                        className="secondPic"
                      />
                    </div>
                    <div className="mainBottom">
                      <div>
                        <button>{el.category}</button>
                      </div>
                      <div>
                        <h2 className="title">
                          <Link to={`/fullart/${el._id}/`}>{el.title}</Link>
                        </h2>
                        <div>
                          <div dangerouslySetInnerHTML={{__html: el.textArt}} className="text" />
                        </div>
                      </div>
                      {myInfo?.map((elUser: any) => (
                        <div className="mainBottomArt">
                          <div className="human">
                            <div>
                              <img
                                src={elUser.imageSrc?.dataUrl || human1}
                                alt="profile photo"
                                className="user_photo"
                              />
                            </div>
                            <div>
                              <p className="humanText">
                                {elUser.name ? elUser.name + ' ' + elUser.lastName : ''}
                              </p>
                            </div>
                          </div>
                          <div>
                            <p className="humanTextSec">{el.data}</p>
                          </div>
                          <div className="humanSec">
                            <div>
                              <img src={eye} />
                            </div>
                            <div>
                              <p className="humanTextSec">{el.count}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {!token && <Navigate to="/auth" />}
          </div>
        </div>
      ) : (
        <div className="inProfContainer">
          <div className="profContPhoto">
            <span className="line">
              <div>
                <img
                  src={myInfo[0]?.imageSrc?.dataUrl || prof}
                  alt="User photo"
                  className="user_photo"
                />
              </div>
              <div>
                <h3>{myInfo[0] ? myInfo[0].name + ' ' + myInfo[0].lastName : ''}</h3>
              </div>
              <div>
                <p>{myInfo[0]?.description ? myInfo[0].description : ''}</p>
              </div>
            </span>
          </div>
          <div className="but">
            <Link to="/addarticle/">
              <button>Add new article</button>
            </Link>
          </div>
        </div>
      )}
      {!token && <Navigate to="/auth" />}
    </div>
  );
};

export default MyArticlePage;
