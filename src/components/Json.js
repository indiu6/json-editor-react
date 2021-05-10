import { dbService } from '../myFirebase';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const Json = ({ jsonObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newJson, setNewJson] = useState(jsonObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure to delete this json?');
    if (ok) {
      await dbService.doc(`jsons/${jsonObj.id}`).delete();
    }
  };

  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    await dbService.doc(`jsons/${jsonObj.id}`).update({
      text: newJson,
    });
    setEditing(false);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;

    setNewJson(value);
  };

  return (
    <div className="json">
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmit} className="containerEditor jsonEdit">
                <textarea
                  type="text"
                  placeholder="Edit your Json"
                  value={newJson}
                  required
                  autoFocus
                  onChange={onChange}
                  rows="15"
                />

                <input type="submit" value="Update Json" className="formBtn" />
              </form>

              <span onClick={toggleEditing} className="formBtn cancelBtn">
                Cancel
              </span>
            </>
          )}
        </>
      ) : (
        <>
          {isOwner && (
            <textarea type="text" rows="15" readOnly value={jsonObj.text} />
          )}

          {isOwner && (
            <div className="json__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} size="2x" />
              </span>

              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} size="2x" />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Json;
