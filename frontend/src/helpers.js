export const getNotes = async (
  api,
  user_id,
  currentPage,
  setNotes,
  setPageCount,
  notesPerPage = 10
) => {
  let url = user_id
    ? `api/user/notes/${user_id}/?page=${currentPage + 1}`
    : `api/notes/?page=${currentPage + 1}&page_size=${notesPerPage}`;
  if (user_id === 'followers') {
    url = `api/notes/followers/?page=${currentPage + 1}`;
  }
  api
    .get(url)
    .then((response) => response.data)
    .then((data) => {
      setNotes(data.results);
      setPageCount(data.count);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deleteNote = async (
  api,
  id,
  getNotes,
  user_id,
  currentPage,
  setNotes,
  setPageCount,
  notesPerPage = 10
) => {
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
        getNotes(
          api,
          user_id,
          currentPage,
          setNotes,
          setPageCount,
          notesPerPage
        );
      } else {
        console.error('Error');
      }
    })
    .catch((error) => console.error(error));
};

export const likeNote = async (
  api,
  id,
  setLikeStatus,
  getNotes,
  user_id,
  currentPage,
  setNotes,
  setPageCount,
  notesPerPage = 10
) => {
  api
    .put(`/api/notes/like/${id}/`, {}) // Send an empty payload
    .then((res) => {
      if (res.status === 200) {
        console.log('Note liked');
        setLikeStatus((prevStatus) => !prevStatus); // Toggle likeStatus to trigger re-render
        getNotes(
          api,
          user_id,
          currentPage,
          setNotes,
          setPageCount,
          notesPerPage
        ); // Update notes data
      } else {
        console.error('Error');
      }
    })
    .catch((error) => console.error(error));
};
