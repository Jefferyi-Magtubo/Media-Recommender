import React from "react";
import { useLocation } from "react-router-dom";
import { options } from "../APIoptions";


export default function Recommendation() {
    const location = useLocation()

    console.log(location.state.runtime, location.state.castAndCrew)

    const actorsQuery = location.state.castAndCrew.filter((person: {id: number, job: string}) => person.job == "Actor")
        .map((actor: {id: number, job: string}) => {return actor.id}).join("%2C")

    const genresQuery = location.state.genres.join("%2C")

    const crewQuery = location.state.castAndCrew.filter((person: {id: number, job: string}) => person.job != "Actor").map((person: {id: number, job: string}) => {return person})
    console.log(crewQuery)
    const crewMovies: {id: number, job: string}[] = []
    crewQuery.forEach(async (person : {id: number, job: string}) => {
        const res = await fetch(`https://api.themoviedb.org/3/person/${person.id}/movie_credits?language=en-US`, options)
        const crewResults = await res.json()
        for(let i = 0; i < crewResults.crew.length; i++) {
            crewResults.crew.forEach((credit: {job: string, id: number}) => {
                if(crewMovies.length === 0 && i === 0) {
                    crewMovies.push({id: credit.id, job: credit.job})
                } else if (crewMovies.length !== 0) {
                    
                }
            })
        }

    })

    async function getRecommendedMovie() {
        const filteredMovies = []
        for(let i = 1; i < 6; i++) {
            const res1 = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${i}
                ${location.state.year ? `&primary_release_year=${location.state.year}` : ""}&sort_by=popularity.desc
                ${actorsQuery ? `&with_cast=${actorsQuery}` : ""}
                ${genresQuery ? `&with_genres=${genresQuery}` : ""}
                ${location.state.language ? `&with_original_language=${location.state.language}` : ""}
                ${location.state.runtime ? `&with_runtime.gte=${location.state.runtime - 8}`  : ""}
                ${location.state.runtime ? `&with_runtime.lte=${location.state.runtime + 8}` : ""}`, options)
            const filteredData = await res1.json()
            filteredMovies.push(filteredData.results.map((movie : {id:number}) => {return movie.id}))
        }

        const finalFilteredFilms = [].concat(...filteredMovies)
        console.log(finalFilteredFilms)
    }
    
    getRecommendedMovie()

    return (
        <>

        </>
    )
}