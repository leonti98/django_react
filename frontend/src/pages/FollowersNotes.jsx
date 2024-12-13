import { useEffect, useState } from 'react';
import api from '../api';
import MyNavBar from '../components/NavBar';
import Note from '../components/Note';
import { likeNote } from '../helpers';
import MyPagination from '../components/MyPagination';

const FollowersNotes = () => {
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [likeStatus, setLikeStatus] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [total, setTotal] = useState(0);
  const notesPerPage = 10;

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
        setTotal(data.count); // Set total to the count of notes
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
      <MyPagination
        currentPage={currentPage + 1}
        total={total} // Use total for the total number of notes
        limit={notesPerPage} // Use limit for the number of notes per page
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default FollowersNotes;
