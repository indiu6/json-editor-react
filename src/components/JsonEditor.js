import { dbService, storageService } from '../myFirebase';
import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
// import Editor from './Editor';

import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';

const JsonFactory = ({ userObj }) => {
  const [json, setJson] = useState();
  const [attachment, setAttachment] = useState('');

  let jsonRef = useRef();
  let editorRef = useRef();

  useEffect(() => {
    let options = {
      mode: 'tree',
    };

    let editor = new JSONEditor(jsonRef, options);
    editor.set(json);

    editorRef.current = editor;

    return () => {
      editor.destroy();
    };
  }, [json]);

  useEffect(() => {
    const getRandomJson = async () => {
      const BASE_URL = 'https://random-data-api.com/api/';
      try {
        const jsonData = await axios.get(`${BASE_URL}/users/random_user`);
        return jsonData;
      } catch (err) {
        console.log('error: ', err);
      }
    };

    getRandomJson().then((jsonData) => setJson(jsonData.data));
  }, []);

  const onSubmit = async (event) => {
    if (json === '') return;
    event.preventDefault();

    let attachmentUrl = '';
    if (attachment !== '') {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);

      const response = await attachmentRef.putString(attachment, 'data_url');
      attachmentUrl = await response.ref.getDownloadURL();
    }

    const jsonObj = {
      text: JSON.stringify(editorRef.current.get(), null, 2),
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };

    await dbService.collection('jsons').add(jsonObj);

    // setJson('');
    alert('JSON data is saved');
    setAttachment('');
  };

  const onRefresh = () => {
    window.location.reload();
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;

    const aFile = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(aFile);

    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;

      setAttachment(result);
      console.log(result);
    };

    // console.log(JSON.stringify(JSON.parse(aFile), null, 2));

    // editorRef.current.set(JSON.parse(attachment));
  };

  const onClearAttachment = () => {
    setAttachment('');

    let fileElement = document.getElementById('attachFile');
    fileElement.value = null;
  };

  return (
    <div>
      <div
        className="jsoneditor-react-container"
        ref={(elem) => (jsonRef = elem)}
      ></div>

      <form onSubmit={onSubmit} className="factoryForm">
        <div className="factoryInput__container">
          <input
            onClick={onRefresh}
            value="New Random Data"
            className="factoryInput__refresh"
          />
          <input type="submit" value="Save" className="factoryInput__save" />
        </div>

        <label htmlFor="attachFile" className="factoryInput__label">
          <span style={{ fontSize: 15 }}>Load JSON files</span>
          <FontAwesomeIcon icon={faPlus} />
        </label>

        <input
          type="file"
          accept=".json"
          id="attachFile"
          onChange={onFileChange}
          style={{
            opacity: 0,
          }}
        />

        {/* todo not photo but json */}
        {attachment && (
          <div className="factoryForm__attachment">
            {/* <img
              src={attachment}
              alt="attached pic"
              style={{
                backgroundImage: attachment,
              }}
            /> */}

            <div className="factoryForm__clear" onClick={onClearAttachment}>
              <span>Remove</span>
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default JsonFactory;
