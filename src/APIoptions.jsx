export const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMDE5ZTY2MGZmNzgzY2MzOGE4MTQxYzEwZDFhZmY1ZCIsInN1YiI6IjY1ZTYyYTViNDRhNDI0MDE2MzExYjRhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GazFikd49xSoeBndOmkWfGybikZFWmmLXdHbJcrnITg'
    }
  };

export const genres = fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));