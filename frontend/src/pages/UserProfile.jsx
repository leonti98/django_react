import { useEffect, useState } from 'react';
import api from '../api';
import { useParams } from 'react-router-dom';
import Navbar from '../components/NavBar';
import Note from '../components/Note';
import MyPagination from '../components/MyPagination';
import FollowButton from '../components/FollowButton';
import { getNotes, deleteNote, likeNote } from '../helpers';

const UserProfile = () => {
  const { user_id } = useParams();
  const [notes, setNotes] = useState([]);
  const [username, setUsername] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [likeStatus, setLikeStatus] = useState(false); // Add likeStatus state

  useEffect(() => {
    getNotes(api, user_id, currentPage, setNotes, setPageCount);
  }, [currentPage]);

  useEffect(() => {
    api
      .get(`api/user/${user_id}/`)
      .then((response) => response.data)
      .then((data) => {
        setUsername(data.username);
        setFollowers(data.followers);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user_id]);

  return (
    <div>
      <Navbar />
      <div className="container d-flex-column align-items-center justify-content-center">
        <h1 className=" text-center">{username} Posts</h1>
        <p className="text-center">followers: {followers.length}</p>
        <FollowButton
          userToFollow={user_id}
          followers={followers ? followers : []}
          setFollowers={setFollowers} // Pass setFollowers to FollowButton
        />
        <div className="">
          {notes.map((note) => (
            <Note
              key={note.id}
              note={note}
              onDelete={() =>
                deleteNote(
                  api,
                  note.id,
                  getNotes,
                  user_id,
                  currentPage,
                  setNotes,
                  setPageCount
                )
              }
              onLike={() =>
                likeNote(
                  api,
                  note.id,
                  setLikeStatus,
                  getNotes,
                  user_id,
                  currentPage,
                  setNotes,
                  setPageCount
                )
              }
            />
          ))}
        </div>
        <MyPagination
          currentPage={currentPage + 1}
          total={pageCount}
          limit={10}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default UserProfile;
