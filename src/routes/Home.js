import React, { useEffect, useState } from 'react';
import { dbService } from '../myFirebase';

const Home = ({ userObj }) => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    dbService
      .collection('tweets')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        const tweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTweets(tweetArray);
      });
  }, []);

  return (
    <div className="container">
      <div style={{ marginTop: 30 }}>
        {tweets.map((tweet) => ({
          //todo add ui
          /* <Tweet
            key={tweet.id}
            tweetObj={tweet}
            isOwner={tweet.creatorId === userObj.uid}
          /> */
        }))}
      </div>
    </div>
  );
};

export default Home;
