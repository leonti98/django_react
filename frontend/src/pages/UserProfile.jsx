import { useEffect, useState } from 'react';
import api from '../api';
import { useParams } from 'react-router-dom';
import Navbar from '../components/NavBar';
import Note from '../components/Note';
import MyPagination from '../components/MyPagination';

const UserProfile = () => {
  const { user_id } = useParams();
  const [notes, setNotes] = useState([]);
  const [username, setUsername] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [followers, setFollowers] = useState(0);

  useEffect(() => {
    getNotes();
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

  const getNotes = async () => {
    api
      .get(`api/user/notes/${user_id}/?page=${currentPage + 1}`)
      .then((response) => response.data)
      .then((data) => {
        console.log(data.results);

        setNotes(data.results);
        setPageCount(data.count);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteNote = async (id) => {
    const confirmation = window.confirm(
      'Are you sure you want to delete this note?'
    );
    if (!confirmation) {
      return;
    }
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          console.log('Note deleted');
        } else {
          console.error('Error');
        }
        getNotes();
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <Navbar />
      <div className="container d-flex-column align-items-center justify-content-center">
        <h1 className=" text-center">{username} Posts</h1>
        <p className="text-center">
          followers {followers.count > 0 ? followers.count : 0}
        </p>
        <div className="">
          {notes.map((note) => (
            <Note key={note.id} note={note} onDelete={deleteNote} />
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
