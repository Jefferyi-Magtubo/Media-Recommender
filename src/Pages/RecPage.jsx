import React from 'react'
import { options } from '../APIoptions'
import { nanoid } from 'nanoid'
import MovieElement from '/src/components/MovieElement/MovieElement.jsx'

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
                // <div className='movieElement' key={movie.id}>
                //     {movie.poster_path ? 
                //         <img className="moviePoster" alt={`This is the movie poster for ${movie.title}.`} src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}/> : 
                //         <div className='noPoster'>This blank rectangle means no poster could be found</div>}
                //     <div className='movieInfo'>
                //         <h1>{movie.title} {movie.release_date ? `(${movie.release_date.slice(0,4)})` : null}</h1>
                //         <p>{movie.overview ? movie.overview : "Details about the plot could not be found."}</p>
                //     </div>
                // </div>
                <MovieElement key={movie.id} id={movie.id} title={movie.title} rDate={movie.release_date} summary={movie.overview} poster={movie.poster_path}/>
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