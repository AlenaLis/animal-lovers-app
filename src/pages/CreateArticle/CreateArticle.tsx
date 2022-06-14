import React, {useCallback, useEffect, useState} from 'react';
// @ts-ignore
import {Editor} from 'react-draft-wysiwyg';
// @ts-ignore
import {EditorState, convertToRaw} from 'draft-js';
// import {Na} from 'react-router-dom';
import {Link, useNavigate} from 'react-router-dom';
import {Navigate} from 'react-router-dom';
// @ts-ignore
import draftToHtml from 'draftjs-to-html';
import Fade from '@mui/material/Fade';

// import {addOneArticle} from '../../services';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './styles.scss';
import {addOneArticle, getProfileInfo} from '../../services';
import {List, Collapse, ListItemButton, ListItemText, Button, Menu, MenuItem} from '@mui/material';

const CreateArticle = () => {
  const [dataForm, setDataForm] = useState({
    title: '',
    titleForShow: '',
    category: '',
    description: EditorState.createEmpty(),
    date: Date.now(),
    date2: '',
    idUser: '',
    idArt: '',
    image: '',
  });

  const [art, setMyArt] = useState();
  const [myInfo, setMyInfo]: any = useState([]);

  const userId = localStorage.getItem('userId');

  const getProfileApi = useCallback(() => {
    getProfileInfo({}, userId).then((res: any) => {
      setMyInfo(res);
    });
  }, []);

  useEffect(() => {
    getProfileApi()
  },[])

  const setArt = useCallback(async () => {
    await addOneArticle({
      id: localStorage?.getItem('userId'),
      title: dataForm.title,
      category: dataForm.category,
      textArt: dataForm.titleForShow,
      data: dataForm.date2,
      imageSrc: {
        dataUrl: art,
        format: 'png',
      },
    }).then(res => {
      navigate('/');
      window.location.reload();
    });
  }, [dataForm, art]);

  const token = localStorage.getItem('CC_Token');
  const navigate = useNavigate();

  let newDate: any = dataForm.date;
  newDate = new Date().toLocaleDateString();

  const changeDataInput = (e: any, key: any) => {
    const dataText = draftToHtml(convertToRaw(dataForm.description.getCurrentContent()));

    if (key === 'description') {
      setDataForm(prevState => ({
        ...prevState,
        [key]: e,
        titleForShow: dataText,
        date2: newDate,
        id: Date.now(),
      }));
    } else {
      const {value} = e.target;
      setDataForm(prevState => ({
        ...prevState,
        [key]: value,
        titleForShow: dataText,
        date2: newDate,
        id: Date.now(),
      }));
    }
  };

  const uploadImagesWithComp = async (e: any) => {
    const imageDataUrl: any = await readFile(e);
    setMyArt(imageDataUrl);
  };

  const readFile = (image: any) =>
    new Promise(resolve => {
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result), false);
      reader.readAsDataURL(image);
    });

  const createNewArt = async () => {
    await setArt();
  };

  const [anchorEl, setAnchorEl]: any = React.useState<null | HTMLElement>(null);
  const open: any = Boolean(anchorEl);
  const handleClick: any = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (title: string) => {
    setDataForm(prevState => ({
      ...prevState,
      category: title,
    }));
    setAnchorEl(null);
  };

  return (
    <div>
      <div className="addArtContent">
        <div>
          <h2 className="h2Text"> Add an article </h2>
        </div>
        <div className="validForm">
          <div>
            <input
              className="input"
              onChange={e => {
                changeDataInput(e, 'title');
              }}
              type="text"
              value={dataForm.title}
              placeholder={'Title'}
            />
          </div>
          <div>
            <div className="categoryContent">
              <Button
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                {dataForm?.category && dataForm?.category != '[object Object]'
                  ? `${dataForm?.category}`
                  : 'Choose category please'}
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
            {/*<input*/}
            {/*    className="input"*/}
            {/*    onChange={(e) => {*/}
            {/*        changeDataInput(e, 'category')*/}
            {/*    }}*/}
            {/*    type="text"*/}
            {/*    value={dataForm.category}*/}
            {/*    placeholder={'Category'}*/}
            {/*/>*/}
          </div>
        </div>
        <div className="editor">
          <Editor
            editorState={dataForm.description}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            type="text"
            placeholder={'Text for an article should be here'}
            onEditorStateChange={(e: any) => {
              changeDataInput(e, 'description');
            }}
          />
        </div>
        <div className="validBottom">
          {/*<Link to="/inprof/">*/}
          <button className="buttonPublish" onClick={createNewArt}>
            <p>Publish an article</p>
          </button>
          {/*</Link>*/}
          <button className="buttonCreateImage">
            <p>Add a picture</p>

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
      </div>
      {!token && <Navigate to="/auth" />}
      {myInfo[0]?.admin === true && <Navigate to="/" />}
    </div>
  );
};

export default CreateArticle;
