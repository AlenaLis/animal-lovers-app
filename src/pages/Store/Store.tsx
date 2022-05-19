import React, {useState} from 'react';
import {Navigate} from 'react-router-dom';
import {Button} from '@mui/material';

import cat from '../../assets/images/сat1.jpeg';
import cat2 from '../../assets/images/cat2.webp';
import cat3 from '../../assets/images/cat3.jpeg';
import dog from '../../assets/images/dog.webp';
import dog2 from '../../assets/images/dog3.jpeg';
import dog3 from '../../assets/images/dog2.jpeg';
import dog4 from '../../assets/images/dog4.jpeg';

import './styles.scss';

const Store = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(6);
  const [myArticle, setMyArticle]: any = useState([
    {
      category: '#for dogs',
      count: 6,
      data: '5$',
      imageSrc: dog,
      title: 'Food for dog',
      name: 'Pet Shop 1',
    },
    {
      category: '#for cats',
      count: 1,
      data: '16$',
      imageSrc: cat2,
      title: 'Cats food',
      name: 'Cats Love Shop',
    },
    {
      category: '#for dogs',
      count: 12,
      data: '20$',
      imageSrc: dog2,
      title: 'Rug for kittens',
      name: 'Dog Food',
    },
    {
      category: '#for cats',
      count: 20,
      data: '10$',
      imageSrc: cat3,
      title: 'Glass for dogs',
      name: 'Pets Store',
    },
    {
      category: '#for cats',
      count: 23,
      data: '10$',
      imageSrc: dog3,
      title: 'Feed your pet',
      name: 'Store',
    },
    {
      category: '#for dogs',
      count: 100,
      data: '10$',
      imageSrc: dog4,
      title: 'Food for dog',
      name: 'Pretty pets',
    },
  ]);

  const token = localStorage.getItem('CC_Token');

  const goToPreviousPage = () => {
    if (startIndex !== 0) {
      setStartIndex(startIndex - 6);
      setEndIndex(endIndex - 6);
    }
  };

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

  const reload = () => {
    window?.location?.reload();
  };

  return (
    <div>
      {myArticle?.length > 0 ? (
        <div className="main">
          <div className="mainTop">
            <div>
              <img src={cat} alt="Image from the most popular art" className="mainArt" />
            </div>
            <div className="mainPanel">
              <div className="leftButton">
                <button>#pets care</button>
              </div>
              <div>
                <h2 className="h2Text">Kitten scratching post</h2>
                <p className="text">
                  <div>
                    Kittens often scratch and bite while theyre playing and become overexcited. This
                    behavior is natural to kittens and is not a sign of hostility or fear (most of
                    the time), but if left unchecked, it can become a serious problem. This is
                    especially true when your kitten
                  </div>
                  <div className="buyButton">
                    <Button>Buy now</Button>
                  </div>
                </p>
              </div>
              <div className="mainPanelBottom">
                <div className="mainPanelBottomHuman">
                  <div>
                    <img src={dog4} alt="User photo" className="mainUserPhoto" />
                  </div>
                  <div>
                    <p className="pHuman">The Best Food</p>
                  </div>
                </div>
                <div>
                  <p className="pHumanSecond">{mainArticle?.data}</p>
                </div>
                <div className="mainPanelBottomHumanSecond2">
                  <div>
                    <p>Bought:</p>
                  </div>
                  <div>
                    <p className="pHumanSecond">{mainArticle?.count} users</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mainBottom">
            <div>
              <h1 className="h1Main">You can buy right now</h1>
            </div>

            {myArticle?.map((el: any) => (
              <div className="mainBottomArt">
                <div className="buyButton">
                  <Button>Buy now</Button>
                </div>
                <div className="mainBottomNew">
                  <div>
                    <img src={el?.imageSrc} alt="Image from the article" className="secondArts" />
                  </div>
                  <div className="mainPanelBottomArt2">
                    <div>
                      <button> {el.category}</button>
                    </div>
                    <div>
                      <h2 className="h2Text">{el?.title}</h2>
                      <p className="pText">
                        <div className="pText">
                          Kittens often scratch and bite while theyre playing and become
                          overexcited. This behavior is natural to kittens and is not a sign of
                          hostility or fear (most of the time), but if left unchecked, it can become
                          a serious problem. This is especially true when your kitten
                        </div>
                      </p>
                    </div>
                    <div className="mainPanelBottom">
                      <div className="mainPanelBottomHuman">
                        <div>
                          <img src={dog4} alt="User's photo" className="userPhoto" />
                        </div>
                        <div>
                          <p className="pHuman">{el?.name}</p>
                        </div>
                      </div>
                      <div>
                        <p className="pHumanSecond">{el.data}</p>
                      </div>
                      <div className="mainPanelBottomHumanSecond2">
                        <div>
                          <p>Bought:</p>
                        </div>
                        <div>
                          <p className="pHumanSecond">{el.count} users</p>
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
export default Store;
