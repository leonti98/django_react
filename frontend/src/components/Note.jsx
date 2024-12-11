/* eslint-disable react/prop-types */
const Note = ({ note, onDelete, onLike }) => {
  const formattedDate = new Date(note.created_at).toLocaleString();
  //   console.log(note.likes_count);

  let conditional_button = <></>;
  console.log('==================================');
  console.log(
    "localStorage.getItem('user_id')",
    typeof Number(localStorage.getItem('user_id'))
  );
  console.log('note.likes', note.likes[0]);
  if (note.author === localStorage.getItem('username')) {
    conditional_button = (
      <button className="btn btn-danger" onClick={() => onDelete(note.id)}>
        Delete
      </button>
    );
  } else {
    if (note.likes.includes(Number(localStorage.getItem('user_id')))) {
      conditional_button = (
        <button className="btn btn-warning" onClick={() => onLike(note.id)}>
          Unlike
        </button>
      );
    } else {
      conditional_button = (
        <button className="btn btn-primary" onClick={() => onLike(note.id)}>
          Like
        </button>
      );
    }
  }
  //   console.log('==================================');
  //   console.log('button', conditional_button.p);
  //   console.log('==================================');
  return (
    <div className="border m-2 p-4">
      <h3>{note.title}</h3>
      <p className=" fs-6">{note.author}</p>
      <p className="text-body">{note.content}</p>
      <p>{formattedDate}</p>
      {conditional_button}
    </div>
  );
};

export default Note;
