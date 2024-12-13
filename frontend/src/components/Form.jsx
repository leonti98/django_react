import React, { useState } from 'react';
import api from '../api';

const Form = ({ setNotes }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const createNote = async (e) => {
    e.preventDefault();
    api
      .post('/api/notes/', { title, content })
      .then((res) => {
        if (res.status === 201) {
          setNotes((prevNotes) => [res.data, ...prevNotes]);
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
  );
};

export default Form;
