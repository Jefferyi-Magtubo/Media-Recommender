import React from 'react'
import { NavLink } from "react-router-dom"
import './MovieElement.css'

export default function MovieElement({id, title, rDate, poster, summary} : {id: number, title: string, rDate: string, poster: string, summary: string}) {

    return (
        <NavLink to="/parameters" state={{id: id, title: title}}>
            <div className={`movieElement ${poster ? "" : "noPoster"}`} key={id}>
                {poster ? 
                <img className="moviePoster" alt={`This is the movie poster for ${title}.`} src={`https://image.tmdb.org/t/p/w300/${poster}`}/> : 
                null}

                <div className='movieInfo'>
                    <h1>{title} {rDate ? `(${rDate.slice(0,4)})` : null}</h1>
                    <p>{summary ? summary : "Details about the plot could not be found."}</p>
                    
                    {poster ? null : 
                        <>
                            <p className='noPosterMsg'>No Poster Found</p>
                        </>
                    }
                </div>
            </div>
        </NavLink>
    )
    
}