import React, {useState, useCallback, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Button, TextField} from '@mui/material';

import {login} from '../../services';

import './styles.scss';

const Main = (setupSocket: any) => {
    let [startIndex, setStartIndex] = useState(0);
    let [endIndex, setEndIndex] = useState(6);
    const [myArticle, setMyArticle]:any = useState([]);

    const newArray = myArticle?.slice(startIndex, endIndex);

    const goToPreviousPage = () => {
        if (startIndex !== 0) {
            setStartIndex(startIndex - 6);
            setEndIndex(endIndex - 6);
        }
    };

    const getAllArticle = useCallback(() => {
        // getAllArticles /().then((res) => {
        //     setMyArticle(res)
        // })
    }, [])

    useEffect(() => {
        // getAllArticle()
    }, [])

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

    return (
        <div>
            {(myArticle?.length !< 0) ?
                <div className="main">
                    <div className="main__top">
                        <div>
                            <img
                                src={mainArticle?.imageSrc.dataUrl || '?'}
                                alt='Image from the most popular art'
                                className='main__art'
                            />
                        </div>
                        <div className="main__panel">
                            <div>
                                <button>{mainArticle?.category}</button>
                            </div>
                            <div>
                                <h2 className="h2__text">
                                    <Link
                                        to={`/fullart/${mainArticle?._id}/`}
                                        // path="/fullart/:id/"
                                    >
                                        {mainArticle?.title}
                                    </Link>
                                </h2>
                                <p className="p__text">
                                    <div
                                        dangerouslySetInnerHTML={{__html: mainArticle?.textArt}}
                                        className="p__text"
                                    />
                                </p>
                            </div>
                            <div className="main__panel__bottom">
                                <div className="main__panel__bottom__human">
                                    <div>
                                        <img
                                            src={mainArticle.user.imageSrc?.dataUrl || '?'}
                                            alt='User photo'
                                            className="main__user_photo"
                                        />
                                    </div>
                                    <div>
                                        <p className="p__human">
                                            {mainArticle?.user
                                                ?
                                                (
                                                    mainArticle.user.name + ' ' +
                                                    mainArticle.user.lastName
                                                )
                                                :
                                                ''
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <p className="p__human__second">{mainArticle?.data}</p>
                                </div>
                                <div className="main__panel__bottom__human__second">
                                    <div>
                                        <img
                                            src={'()'}
                                            alt='Eye icon'
                                        />
                                    </div>
                                    <div>
                                        <p className="p__human__second">
                                            {mainArticle?.count}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="main__bottom">
                        <div>
                            <h1 className="h1__main">Popular articles</h1>
                        </div>
                        {newArray?.map((el:any) => (
                            <div className="main__bottom__art">
                                <div className="main__bottom__new">
                                    <div>
                                        <img
                                            src={el.imageSrc.dataUrl || '?'}
                                            alt='Image from the article'
                                            className='second__arts'
                                        />
                                    </div>
                                    <div className="main__panel__bottom__art">
                                        <div>
                                            <button>{el.category}</button>
                                        </div>
                                        <div>
                                            <h2 className="h2__text">
                                                <Link
                                                    to={`/fullart/${el._id}/`}
                                                    // path="/fullart/:id/"
                                                >
                                                    {el.title}
                                                </Link>
                                            </h2>
                                            <p className="p__text">
                                                <div
                                                    dangerouslySetInnerHTML={{__html: el.textArt}}
                                                    className="p__text"
                                                />
                                            </p>
                                        </div>
                                        <div className="main__panel__bottom">
                                            <div className="main__panel__bottom__human">
                                                <div>
                                                    <img
                                                        src={el.user.imageSrc?.dataUrl || ''}
                                                        alt="User's photo"
                                                        className="user__photo"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="p__human">
                                                        {el.user
                                                            ?
                                                            el.user.name + ' ' +
                                                            el.user.lastName
                                                            :
                                                            ''
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="p__human__second">
                                                    {el.data}
                                                </p>
                                            </div>
                                            <div className="main__panel__bottom__human__second">
                                                <div>
                                                    <img
                                                        src={'()'}
                                                        alt='Eye icon'
                                                    />
                                                </div>
                                                <div>
                                                    <p className="p__human__second">
                                                        {el.count}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="bottom__button">
                            <div>
                                <button
                                    className="prev__next__button"
                                    onClick={goToPreviousPage}
                                >
                                    Prev
                                </button>
                            </div>
                            <div>
                                <button
                                    className="prev__next__button"
                                    onClick={goToNextPage}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div>
                    <h2 className="h2__no__articles">
                        No articles here
                    </h2>
                </div>
            }
        </div>
    );
}
export default Main;
