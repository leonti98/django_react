import { useState, useEffect } from 'react';
import api from '../api';
import '../styles/Main.css';
import Note from '../components/Note';
import ReactPaginate from 'react-paginate';

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [likeStatus, setLikeStatus] = useState(false);

  useEffect(() => {
    getNotes();
    getUserID();
  }, []);
  console.log(typeof notes);

  const getUserID = async () => {
    api
      .get('/api/auth/user/')
      .then((response) => response.data)
      .then((data) => {
        localStorage.setItem('user_id', data.id);
      })
      .catch((error) => console.error(error));
  };

  const getNotes = async () => {
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
          alert('Note deleted');
        } else {
          console.error('Error');
        }
        getNotes();
      })
      .catch((error) => console.error(error));
  };

  const likeNote = async (id) => {
    api
      .put(`/api/notes/like/${id}/`, {}) // Send an empty payload
      .then((res) => {
        if (res.status === 200) {
          console.log('Note liked');
          setLikeStatus(!likeStatus); // Toggle likeStatus to trigger re-render
          getNotes(); // Update notes data
        } else {
          console.error('Error');
        }
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
          getNotes();
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
              onDelete={deleteNote}
              onLike={likeNote}
              likeStatus={likeStatus} // Pass likeStatus as a prop
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
