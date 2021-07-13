import React, { useEffect, useState } from 'react';
import { dbService, analytics } from '../myFirebase';

import JsonEditor from '../components/JsonEditor';
import Json from '../components/Json';

const Home = ({ userObj }) => {
  const [jsons, setJsons] = useState([]);

  useEffect(() => {
    dbService
      .collection('jsons')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        const jsonArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setJsons(jsonArray);
      });

    analytics.logEvent('notification_received');
  }, []);

  return (
    <div className="containerEditor">
      <JsonEditor userObj={userObj} />

      <h2 className="jsonHeader">Saved JSON</h2>

      {jsons.length > 0 ? (
        <>
          <div style={{ marginTop: 30 }}>
            {jsons.map((json) => (
              <Json
                key={json.id}
                jsonObj={json}
                isOwner={json.creatorId === userObj.uid}
              />
            ))}
          </div>
        </>
      ) : (
        <p className="jsonNoSave">No Saved Data</p>
      )}
    </div>
  );
};

export default Home;
