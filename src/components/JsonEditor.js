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
      // text: editorRef.current.getText(),
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };

    await dbService.collection('jsons').add(jsonObj);

    // setJson('');
    alert('JSON data is saved');
    setAttachment('');
  };

  // const onChange = (event) => {
  //   const {
  //     target: { value },
  //   } = event;

  //   setJson(value);
  // };

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
    };
  };

  const onClearAttachment = () => {
    setAttachment('');

    let fileElement = document.getElementById('fileId');
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
          {/* <input
            className="factoryInput__input"
            value={json}
            onChange={onChange}
            type="text"
            placeholder="Change this to JSON editor"
            maxLength={120}
          /> */}

          <input type="submit" value="Save" className="factoryInput__save" />
        </div>

        <label htmlFor="attach-file" className="factoryInput__label">
          <span style={{ fontSize: 15 }}>Add JSON files</span>
          <FontAwesomeIcon icon={faPlus} />
        </label>

        <input
          type="file"
          accept=".json"
          id="attach-file"
          onChange={onFileChange}
          style={{
            opacity: 0,
          }}
        />

        {attachment && (
          <div className="factoryForm__attachment">
            {/* todo not photo but json */}
            <img
              src={attachment}
              alt="attached pic"
              style={{
                backgroundImage: attachment,
              }}
            />

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
