import { useEffect, useState } from 'react';
import api from '../api';
import { useParams } from 'react-router-dom';
import Navbar from '../components/NavBar';
import Note from '../components/Note';
import MyPagination from '../components/MyPagination';
import FollowButton from '../components/FollowButton';
import { getNotes } from '../helpers';

const UserProfile = () => {
  // Get user_id from URL
  const { user_id } = useParams();
  const [notes, setNotes] = useState([]);
  const [username, setUsername] = useState('');
  const [followers, setFollowers] = useState(0);
  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const handleNoteDeleted = (deletedNoteId) => {
    setNotes((prevNotes) =>
      prevNotes.filter((note) => note.id !== deletedNoteId)
    );
  };

  useEffect(() => {
    const filters = JSON.stringify({ author: user_id });
    getNotes(api, '', currentPage, setNotes, setPageCount, 10, filters);
  }, [currentPage, user_id]);

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
        {user_id === localStorage.getItem('user_id') ? (
          <h1 className=" text-center">My Posts</h1>
        ) : (
          <>
            <h1 className=" text-center">{username} Posts</h1>
            <FollowButton
              userToFollow={user_id}
              followers={followers ? followers : []}
              setFollowers={setFollowers}
            />
          </>
        )}

        <div className="">
          {notes.map((note) => (
            <Note key={note.id} note={note} onNoteDeleted={handleNoteDeleted} />
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
