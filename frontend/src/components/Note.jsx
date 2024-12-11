import React from 'react';

const Note = ({ note, onDelete }) => {
  console.log(note);

  const formattedDate = new Date(note.created_at).toLocaleString();

  return (
    <div className="col border m-1 p-2">
      <h3>{note.title}</h3>
      <p className="text-body">{note.content}</p>
      <p>{formattedDate}</p>
      <button className="btn btn-info" onClick={() => onDelete(note.id)}>
        Delete
      </button>
    </div>
  );
};

export default Note;
