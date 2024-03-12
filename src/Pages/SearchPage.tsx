import React from 'react'
import { options } from '../APIoptions'
import MovieElement from '../components/MovieElement/MovieElement'

export default function SearchPage() {

    // Generating list of Movies based on the search
    const [movieList, setMovieList] = React.useState([])

    async function handleSearch () {

        const userInput = document.getElementById('movieInput') as HTMLInputElement

        const searchValue = userInput.value.split(" ").join("%20")
        
        const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchValue}&include_adult=false&language=en-US&page=1`, options)
        const data = await res.json()

        setMovieList(data.results)
        console.log(data)
    }

    const searchElements = movieList ? 

        movieList.slice(0,5).map((movie : {id: number, title: string, release_date: string, overview: string, poster_path: string}) => {
            return (
                <MovieElement key={movie.id} id={movie.id} title={movie.title} rDate={movie.release_date} summary={movie.overview} poster={movie.poster_path}/>
            )
        })

        :

        <h1>False</h1>

    return (
        <>
                <div className='container'>
                    <h1 className='instructions'>Enter a movie of your choice, tell us what you like about it, and we'll give you a film recommendation based on that info!</h1>
                    <input type='text' className='movieInput' id='movieInput'/>
                    <button onClick={handleSearch} className='searchBtn'>Search</button>
                    <div className='movieElements'>
                        {searchElements}
                    </div>
                </div>
 
        </>
    )

}