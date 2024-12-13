import { useEffect, useState } from 'react';
import api from '../api';
import { useParams } from 'react-router-dom';
import Navbar from '../components/NavBar';
import Note from '../components/Note';
import ReactPaginate from 'react-paginate';

const UserProfile = () => {
  const { user_id } = useParams();
  const [notes, setNotes] = useState([]);
  const [username, setUsername] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  useEffect(() => {
    getNotes();
  }, [currentPage]);

  const getNotes = async () => {
    api
      .get(`api/user/${user_id}/?page=${currentPage + 1}`)
      .then((response) => response.data)
      .then((data) => {
        console.log(data.results);

        setNotes(data.results);
        setPageCount(Math.ceil(data.count / 10));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="container d-flex-column align-items-center justify-content-center">
        <h1 className=" text-center">{username} Posts</h1>
        <div className="">
          {notes.map((note) => (
            <Note key={note.id} note={note} />
          ))}
        </div>
        <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
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
  );
};

export default UserProfile;
