export const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`
    }
  };

export const genres = fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

export async function fetchLanguages() {
    const res2 = await fetch('https://api.themoviedb.org/3/configuration/languages', options);
    const languages = await res2.json();
    return languages;
}
