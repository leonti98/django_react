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
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const notesPerPage = 10;

  useEffect(() => {
    getNotes();
    getUserID();
  }, [currentPage]);
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
      .get(`/api/notes/?page=${currentPage + 1}&page_size=${notesPerPage}`)
      .then((response) => response.data)
      .then((data) => {
        setNotes(data.results);
        setPageCount(Math.ceil(data.count / notesPerPage));
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
          console.log('Note deleted');
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

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
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
        <div itemID="pagination" className=" d-flex justify-content-center">
          <ReactPaginate
            previousLabel={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-left-circle"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"
                />
              </svg>
            }
            nextLabel={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-right-circle"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
                />
              </svg>
            }
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
