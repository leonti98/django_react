import { useState, useEffect } from 'react';
import api from '../api';
import '../styles/Main.css';
import Note from '../components/Note';
import MyNavBar from '../components/NavBar';
import MyPagination from '../components/MyPagination';
import { getNotes, deleteNote, likeNote } from '../helpers';

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [likeStatus, setLikeStatus] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [total, setTotal] = useState(0);
  const notesPerPage = 10;

  useEffect(() => {
    getNotes(api, '', currentPage, setNotes, setTotal, notesPerPage);
    getUser();
  }, [currentPage]);
  console.log(typeof notes);

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
          // setTitle('');
          // setContent('');
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

  return (
    <div>
      <MyNavBar />
      <div className="container">
        <form
          onSubmit={createNote}
          className="form-container border p-4 shadow-sm mt-3"
        >
          <h2 className=" text-center">Create a note</h2>
          <div>
            <label htmlFor="form-title" className="form-lable">
              Title
            </label>
            <input
              itemID="form-title"
              className="form-control"
              type="text"
              required
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <br />
          <div>
            <label htmlFor="form-content" className="form-lable">
              Content
            </label>
            <textarea
              itemID="form-content"
              className="form-control"
              placeholder="Content"
              value={content}
              required
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <br />
          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </form>
      </div>
      <br />
      <div className="container">
        <h2>Notes</h2>
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
                  '',
                  currentPage,
                  setNotes,
                  setTotal,
                  notesPerPage
                )
              }
              onLike={() =>
                likeNote(
                  api,
                  note.id,
                  setLikeStatus,
                  getNotes,
                  '',
                  currentPage,
                  setNotes,
                  setTotal,
                  notesPerPage
                )
              }
              likeStatus={likeStatus} // Pass likeStatus as a prop
            />
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
