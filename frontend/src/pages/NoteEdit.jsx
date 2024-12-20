import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import api from '../api';
import '../styles/Main.css';
import MyNavBar from '../components/NavBar';
import LoadingIndicator from '../components/LoadingIndicator';
import SuccessAlert from '../components/SuccessAlert';

const EditNote = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const { note_id } = useParams();
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.get(`/api/notes/edit/${note_id}/`).then((res) => {
      console.log(res.data);
      setTitle(res.data.title);
      setContent(res.data.content);
      setLoading(false);
    });
  }, [note_id]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    api
      .put(`/api/notes/edit/${note_id}/`, { title, content })
      .then((res) => {
        if (res.status === 200) {
          setMessage('Note updated');
          setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
        } else {
          console.error('Error');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <MyNavBar />
      <div className="container">
        <h1 className="text-center">Edit Note</h1>
        <form
          onSubmit={handleSubmit}
          className="form-container border p-5 shadow-sm d-flex flex-column"
        >
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="content">Content</label>
            <textarea
              className="form-control"
              id="content"
              value={content}
              onChange={handleContentChange}
              style={{ height: '200px' }}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          {loading && <LoadingIndicator />}
          {message && <SuccessAlert message={message} />}
        </form>
      </div>
    </div>
  );
};

export default EditNote;
