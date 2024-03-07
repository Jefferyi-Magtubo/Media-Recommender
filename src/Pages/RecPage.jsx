import React from 'react'
import { options } from '../APIoptions'

export default function RecPage() {
    const [moviePicked, setMovie] = React.useState("")

    // Generating list of Movies based on the search
    const [movieList, setMovieList] = React.useState(null)

    async function handleSearch () {
        const searchValue = document.getElementById('movieInput').value.split(" ").join("%20")
        
        const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchValue}&include_adult=false&language=en-US&page=1`, options)
        const data = await res.json()

        setMovieList(data.results)
    }

    const searchElements = movieList ? 
        movieList.map((movie) => {
            return (
                <div className='movieElement'>
                    <h1>{movie.original_title}</h1>
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
                    {movieList ? null : <button onClick={handleSearch}>Search</button>}
                    {searchElements}
                </div>
            }
        </>
    )

}