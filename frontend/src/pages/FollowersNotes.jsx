import { useEffect, useState } from 'react';
import api from '../api';
import MyNavBar from '../components/NavBar';
import Note from '../components/Note';

const FollowersNotes = () => {
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    getNotes();
  }, [currentPage]);

  const getNotes = async () => {
    api
      .get(`api/notes/followers/?page=${currentPage + 1}`)
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
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const likeNote = async (id) => {
    api
      .put(`/api/notes/like/${id}/`)
      .then((res) => {
        if (res.status === 200) {
          console.log('Note liked');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <MyNavBar />
      <div className="container">
        <h1>Followers Notes</h1>
        {notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            onDelete={deleteNote}
            onLike={likeNote}
          />
        ))}
      </div>
    </div>
  );
};

export default FollowersNotes;
