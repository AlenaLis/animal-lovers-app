import {Link, Navigate} from 'react-router-dom';
import React, {useCallback, useEffect, useState} from 'react';

import {countWatches, getOneArticleById} from '../../services';

import question from '../../assets/images/question.png';
import img_human from '../../assets/images/human.png';
import eye from '../../assets/images/eye icon.png';

import './styles.scss';

const FullArticle = () => {
  const [myArticle, setMyArticle]: any = useState([]);

  const currentLocation = window.location;
  const newPath = currentLocation.pathname;
  const newParam = newPath.slice(9, 33);
  const token = localStorage.getItem('CC_Token');

  const countWatch = useCallback(async () => {
    await countWatches(newParam);
  }, [newParam]);

  const refreshMyArt = useCallback(async () => {
    await getOneArticleById(newParam).then(res => {
      setMyArticle(res);
    });
  }, [newParam]);

  useEffect(() => {
    countWatch().then(res => {
      refreshMyArt();
    });
  }, [countWatch, refreshMyArt]);

  return (
    <div className="containerArt">
      <div className="ArtContainer">
        <button className="button">
          <Link to="/inprof/">My profile</Link>
        </button>
        <div className="coloumContent">
          <div className="profContArt">
            <div className="mainBottomOneArt">
              <div className="mainBottomNewArt">
                <div>
                  <button>{myArticle[0]?.category}</button>
                </div>
                <img
                  src={myArticle[0]?.imageSrc.dataUrl || question}
                  alt="Image from the art"
                  className="art"
                />
                <h2 className="h2Title">{myArticle[0]?.title}</h2>
                <div className="mainPanelBottomOneArt">
                  <div>
                    <p className="text">
                      <div
                        dangerouslySetInnerHTML={{__html: myArticle[0]?.textArt}}
                        className="text"
                      />
                    </p>
                  </div>
                  <div className="state" />
                  <div className="mainPanelBottomArt">
                    <div className="hum_cont">
                      <div className="mainPanelBottomArtHuman">
                        <div>
                          <img
                            src={myArticle[0]?.user.imageSrc?.dataUrl || img_human}
                            alt="User photo"
                            className="user__photo"
                          />
                        </div>
                        <div>
                          <p className="humanText">
                            {myArticle[0]?.user
                              ? myArticle[0].user.name + ' ' + myArticle[0].user.lastName
                              : ''}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="humanTextSec">{myArticle[0]?.data}</p>
                      </div>
                      <div className="mainPanelBottomArtHumanSec">
                        <div>
                          <img src={eye} />
                        </div>
                        <div>
                          <p className="humanTextSec">{myArticle[0]?.count}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bot">
                      <button className="but">Typography</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {!token && <Navigate to="/auth" />}
    </div>
  );
};

export default FullArticle;
