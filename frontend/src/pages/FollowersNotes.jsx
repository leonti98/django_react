import { useEffect, useState } from 'react';
import api from '../api';
import MyNavBar from '../components/NavBar';
import Note from '../components/Note';
import { likeNote } from '../helpers';

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
        setPageCount(data.count);
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
    </div>
  );
};

export default FollowersNotes;
