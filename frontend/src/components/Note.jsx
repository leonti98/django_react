const Note = ({ note, onDelete }) => {
  console.log(note);

  const formattedDate = new Date(note.created_at).toLocaleString();
  // log current user id and note user id

  return (
    <div className="border m-2 p-4">
      <h3>{note.title}</h3>
      <p className=" fs-6">{note.author}</p>
      <p className="text-body">{note.content}</p>
      <p>{formattedDate}</p>
      {note.author === localStorage.getItem('username') && (
        <button className="btn btn-danger" onClick={() => onDelete(note.id)}>
          Delete
        </button>
      )}
    </div>
  );
};

export default Note;
