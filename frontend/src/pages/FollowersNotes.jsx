import { useEffect, useState } from 'react';
import api from '../api';
import MyNavBar from '../components/NavBar';
import Note from '../components/Note';
import { getNotes } from '../helpers';
import MyPagination from '../components/MyPagination';

const FollowersNotes = () => {
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const notesPerPage = 10;
  const filters = JSON.stringify({
    author__followers: localStorage.getItem('user_id'),
  });

  const handleNoteDeleted = (deletedNoteId) => {
    setNotes((prevNotes) =>
      prevNotes.filter((note) => note.id !== deletedNoteId)
    );
  };

  useEffect(() => {
    getNotes(api, '', currentPage, setNotes, setPageCount, 10, filters);
  }, [currentPage]);

  return (
    <div>
      <MyNavBar />
      <div className="container">
        <h1>Followers Notes</h1>
        {notes.map((note) => (
          <Note key={note.id} note={note} onNoteDeleted={handleNoteDeleted} />
        ))}
      </div>
      <MyPagination
        currentPage={currentPage + 1}
        total={pageCount}
        limit={notesPerPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default FollowersNotes;
