/* eslint-disable react/prop-types */
import { useState } from 'react';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { Link } from 'react-router-dom';
import LikeButton from './LikeButton';
import api from '../api';
import { deleteNote } from '../helpers';

TimeAgo.addDefaultLocale(en);

const Note = ({ note, onNoteDeleted }) => {
  const [likeStatus, setLikeStatus] = useState(
    note.likes.includes(Number(localStorage.getItem('user_id')))
  );
  const timeAgo = new TimeAgo('en-US');
  const formattedDate = timeAgo.format(new Date(note.created_at));

  const handleDelete = () => {
    deleteNote(api, note.id, () => {
      onNoteDeleted(note.id);
    });
  };

  let conditional_button = <></>;

  if (note.author === Number(localStorage.getItem('user_id'))) {
    conditional_button = (
      <>
        <button className="btn btn-danger me-2" onClick={handleDelete}>
          Delete
        </button>
        <Link to={`/notes/edit/${note.id}`} className="btn btn-primary me-2">
          Edit
        </Link>
      </>
    );
  } else {
    conditional_button = (
      <LikeButton
        liked={likeStatus}
        likesCount={note.likes_count}
        id={note.id}
      />
    );
  }

  return (
    <div className="border m-2 p-4">
      <h3>{note.title}</h3>
      <p className="text-muted">
        By: <Link to={`/user/${note.author}`}>{note.author_username}</Link>
      </p>
      <p className="text-body">{note.content}</p>

      <div className="d-flex justify-content-between align-items-baseline mt-5">
        <div>{conditional_button}</div>
        <p>{formattedDate}</p>
      </div>
    </div>
  );
};

export default Note;
