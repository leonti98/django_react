import { useState, useEffect } from 'react';
import api from '../api';

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    gethNotes();
  }, []);

  const gethNotes = async () => {
    api
      .get('/api/notes/')
      .then((response) => response.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((error) => console.error(error));
  };

  const deleteNote = async (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          alert('Note deleted');
        } else {
          console.error('Error');
        }
        gethNotes();
      })
      .catch((error) => console.error(error));
  };

  return <div>Home</div>;
};

export default Home;
