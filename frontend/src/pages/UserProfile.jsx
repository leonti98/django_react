import { useEffect, useState } from 'react';
import api from '../api';
import { useParams } from 'react-router-dom';
import Navbar from '../components/NavBar';
import Note from '../components/Note';

const UserProfile = () => {
  const [notes, setNotes] = useState([]);
  const [username, setUsername] = useState('');
  const { user_id } = useParams();

  const getUsername = async () => {
    api
      .get(`/api/auth/user/`)
      .then((response) => {
        setUsername(response.data.username);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUsername();
    api
      .get(`api/user/${user_id}/`)
      .then((response) => {
        console.log(response.data);
        setNotes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container d-flex-column align-items-center justify-content-center">
        <h1 className=" text-center">{username} Profile</h1>
        <div className="">
          {notes.map((note) => (
            <Note key={note.id} note={note} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
