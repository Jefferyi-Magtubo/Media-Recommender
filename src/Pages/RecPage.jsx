import React from 'react'
import { options } from '../APIoptions'
import { nanoid } from 'nanoid'

export default function RecPage() {
    const [moviePicked, setMovie] = React.useState("")

    // Generating list of Movies based on the search
    const [movieList, setMovieList] = React.useState(null)

    async function handleSearch () {
        const searchValue = document.getElementById('movieInput').value.split(" ").join("%20")
        
        const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchValue}&include_adult=false&language=en-US&page=1`, options)
        const data = await res.json()

        setMovieList(data.results)
        console.log(data)
    }

    const searchElements = movieList ? 

        movieList.slice(0,5).map((movie) => {
            return (
                <div className='movieElement' key={nanoid()}>
                    {movie.poster_path ? 
                        <img className="moviePoster" alt={`This is the movie poster for ${movie.original_title}.`} src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}/> : 
                        <div className='noPoster'>This blank square means no poster could be found</div>}
                    <div>
                        <h1>{movie.original_title} {movie.release_date ? `(${movie.release_date.slice(0,4)})` : null}</h1>
                    </div>
                </div>
            )
        })

        :

        <h1>False</h1>

    return (
        <>
            {moviePicked ?

                <h1>True</h1>

                :

                <div className='container'>
                    <h1 className='instructions'>Enter a movie of your choice and tell us what you like about it, and we'll give you a film recommendation based on that info!</h1>
                    <input type='text' className='movieInput' id='movieInput'/>
                    <button onClick={handleSearch} className='searchBtn'>Search</button>
                    <div className='movieElements'>
                        {searchElements}
                    </div>
                </div>
            }
        </>
    )

}