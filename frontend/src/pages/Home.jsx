import { useState, useEffect } from 'react';
import api from '../api';
import '../styles/Main.css';
import Note from '../components/Note';
import MyNavBar from '../components/NavBar';
import MyPagination from '../components/MyPagination';
import { getNotes } from '../helpers';
import Form from '../components/Form';

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [total, setTotal] = useState(0);
  const notesPerPage = 10;

  useEffect(() => {
    getNotes(api, '', currentPage, setNotes, setTotal, notesPerPage);
    getUser();
  }, [currentPage]);

  const getUser = async () => {
    api
      .get('/api/auth/user/')
      .then((response) => response.data)
      .then((data) => {
        localStorage.setItem('user_id', data.id);
        localStorage.setItem('username', data.username);
      })
      .catch((error) => console.error(error));
  };

  const createNote = async (e) => {
    e.preventDefault();
    api
      .post('/api/notes/', { title, content })
      .then((res) => {
        if (res.status === 201) {
          console.log('Note created');
          getNotes(api, '', currentPage, setNotes, setTotal, notesPerPage);
        } else {
          console.error('Error');
        }
      })
      .catch((error) => {
        console.error(error);
        alert('An error occurred while creating the note.');
      });
  };

  const handleNoteDeleted = (deletedNoteId) => {
    setNotes((prevNotes) =>
      prevNotes.filter((note) => note.id !== deletedNoteId)
    );
  };

  return (
    <div>
      <MyNavBar />
      <Form setNotes={setNotes} />
      <br />
      <div className="container">
        <h2>Notes</h2>
        <div className="">
          {notes.map((note) => (
            <Note key={note.id} note={note} onNoteDeleted={handleNoteDeleted} />
          ))}
        </div>
        <div>
          <MyPagination
            currentPage={currentPage + 1}
            total={total}
            limit={notesPerPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
