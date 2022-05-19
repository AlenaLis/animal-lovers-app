import React, {useCallback, useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom';

import {TextField} from '@mui/material';
import {changeProfileInfo, getProfileInfo} from '../../services';

import prof from '../../assets/images/prof_photo.png';

import './styles.scss';

const ProfileInfo = () => {
  const [local, setLocal] = useState({
    firstNameInput: {
      value: '',
      type: '',
    },
    secondNameInput: {
      value: '',
      type: '',
    },
    emailInput: {
      value: '',
      type: '',
    },
    descriptionInput: {
      value: '',
      type: '',
    },
    photoInput: {
      value: '',
      type: '',
    },
  });

  const [photo, setMyPhoto]: any = useState();
  const [myInfo, setMyInfo]: any = useState([]);

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('CC_Token');

  const getProfileApi = useCallback(async () => {
    await getProfileInfo({}, userId).then(res => {
      setMyInfo(res);
    });
  }, []);

  const handleChange = (e: any, key: any) => {
    const {value, type} = e.target;
    setLocal(prevState => ({
      ...prevState,
      [key]: {
        value,
        type,
      },
    }));
  };

  useEffect(() => {
    getProfileApi();
  }, []);

  const checkLengthInfoName =
    local.firstNameInput.value === '' ? myInfo[0]?.name : local.firstNameInput.value;
  const checkLengthInfoSecondName =
    local.secondNameInput.value === '' ? myInfo[0]?.lastName : local.secondNameInput.value;
  const checkLengthInfoDescription =
    local.descriptionInput.value === '' ? myInfo[0]?.description : local.descriptionInput.value;

  const addNewInfo = async (event: {preventDefault: () => void}) => {
    console.log(photo);
    event.preventDefault();

    await changeProfileInfo(
      {
        name: checkLengthInfoName,
        lastName: checkLengthInfoSecondName,
        description: checkLengthInfoDescription,
        imageSrc: {
          dataUrl: photo ? photo : myInfo[0]?.imageSrc?.dataUrl,
          format: 'png',
        },
      },
      userId
    );
  };

  useEffect(() => {
    console.log(photo);
  }, [photo]);

  useEffect(() => {
    if (myInfo[0]) {
      setMyInfo(myInfo[0]);
    }
  }, []);

  const uploadImagesWithComp = async (e: any) => {
    const imageDataUrl: any = await readFile(e);
    setMyPhoto(imageDataUrl);
  };

  const readFile = (image: any) =>
    new Promise(resolve => {
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result), false);
      reader.readAsDataURL(image);
    });

  return (
    <div className="profContainer">
      <div className="profContent">
        <div>
          <h2 className="h2Text"> Profile </h2>
        </div>
        {myInfo?.length > 0 ? (
          <div className="profCont">
            <div className="profContPhoto">
              <span className="line">
                <div>
                  <img
                    src={photo ? photo : myInfo[0]?.imageSrc?.dataUrl || prof}
                    alt={'Profile user photo'}
                    className="userPhoto"
                  />
                </div>
                <div>
                  <button className="photo">
                    <p> Change photo </p>
                    <input
                      className="addPicture"
                      type="file"
                      accept="image/png, image/jpeg"
                      onChange={(e: any) => {
                        uploadImagesWithComp(e.target.files[0]);
                      }}
                    />
                  </button>
                </div>
                <div>
                  <p className="delete">Delete photo</p>
                </div>
              </span>
            </div>
            <div className="profEdit">
              <form className="profForm">
                <div className="formContent">
                  <div>
                    <p>First name</p>
                    <TextField
                      id="outlined-basic"
                      label={myInfo[0]?.name ? myInfo[0]?.name : 'Enter your name'}
                      variant="outlined"
                      onChange={e => {
                        handleChange(e, 'firstNameInput');
                      }}
                      value={local?.firstNameInput?.value}
                      className="input"
                      type="text"
                    />
                  </div>
                  <div>
                    <p>Last name</p>
                    <TextField
                      id="outlined-basic"
                      label={myInfo[0]?.lastName ? myInfo[0]?.lastName : 'Enter your last name'}
                      variant="outlined"
                      onChange={e => {
                        handleChange(e, 'secondNameInput');
                      }}
                      value={local?.secondNameInput.value}
                      className="input"
                      type="text"
                    />
                  </div>
                </div>
                <div className="formContentSecond">
                  <p>Description</p>
                  <td align="right" valign="top">
                    <textarea
                      value={local?.descriptionInput?.value}
                      placeholder={
                        myInfo[0]?.description
                          ? myInfo[0]?.description
                          : 'Please enter your description'
                      }
                      onChange={e => {
                        handleChange(e, 'descriptionInput');
                      }}
                      className="inputDesc"
                    />
                  </td>
                </div>
                <div>
                  <button className="saveButton" onClick={addNewInfo}>
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div />
        )}
      </div>
      {!token && <Navigate to="/auth" />}
    </div>
  );
};

export default ProfileInfo;
