/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import api from '../api';

const FollowButton = ({ userToFollow, followers }) => {
  const [followed, setFollowed] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(followers.length);
    if (followers.includes(userToFollow)) {
      setFollowed(true);
    }
  }, [followers, userToFollow]);

  const follow = async () => {
    api
      .put(`/api/user/follow/${userToFollow}/`)
      .then((response) => {
        if (response.status === 200) {
          setFollowed(true);
          setCount(count + 1);
        }
      })
      .catch((error) => console.error(error));
  };

  const unfollow = async () => {
    api
      .put(`/api/user/follow/${userToFollow}/`)
      .then((response) => {
        if (response.status === 200) {
          setFollowed(false);
          setCount(count - 1);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="d-flex justify-content-center">
      {followed ? (
        <button className="btn btn-danger" onClick={unfollow}>
          Unfollow {count}
        </button>
      ) : (
        <button className="btn btn-primary" onClick={follow}>
          Follow {count}
        </button>
      )}
    </div>
  );
};

export default FollowButton;
