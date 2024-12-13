/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import api from '../api';

const FollowButton = ({ userToFollow, followers, setFollowers }) => {
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
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
          setFollowers((prevFollowers) => [...prevFollowers, userToFollow]);
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
          setFollowers((prevFollowers) =>
            prevFollowers.filter((follower) => follower !== userToFollow)
          );
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="d-flex justify-content-center">
      {followed ? (
        <button className="btn btn-danger" onClick={unfollow}>
          Unfollow
        </button>
      ) : (
        <button className="btn btn-primary" onClick={follow}>
          Follow
        </button>
      )}
    </div>
  );
};

export default FollowButton;
