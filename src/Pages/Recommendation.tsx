import React from "react";
import { useLocation } from "react-router-dom";
import { options } from "../APIoptions";


export default function Recommendation() {
    const location = useLocation()

    console.log(location.state.runtime, location.state.castAndCrew)

    const [crewMovies, setCrewMovies] = React.useState<number[] >([])



    //Getting all the movies that the crew have worked together on
    React.useEffect(() => {
        async function fetchCrewMovies() {
        

        const crewQuery = location.state.castAndCrew.filter((person: {id: number, job: string}) => person.job != "Actor").map((person: {id: number, job: string}) => {return person})

        crewQuery.forEach(async (person : {id: number, job: string}) => {
            const res = await fetch(`https://api.themoviedb.org/3/person/${person.id}/movie_credits?language=en-US`, options)
            const crewResults = await res.json()
            let moviesToCheck : number[] = []
            if(crewQuery.indexOf(person) === 0) {
                crewResults.crew.forEach((credit: {job: string, id: number}) => {
                    if(credit.job === person.job) {
                        setCrewMovies(prevMovies => [...prevMovies, credit.id])
                    }
                })
            } else {
                crewResults.crew.forEach((credit: {id: number, job: string}) => {
                    if(credit.job === person.job) {
                        moviesToCheck.push(credit.id)
                    } 
                })
                console.log("checK", moviesToCheck)
                console.log("before", crewMovies)
                const newCrewMovies = moviesToCheck.filter(element => crewMovies.includes(element))
                console.log("newCrew" + newCrewMovies)
                setCrewMovies(newCrewMovies)
                console.log("crew2" + crewMovies)
            }
        })}

        fetchCrewMovies()
    }, [])
    // 1104269
    const [searchResults, setSearchResults] = React.useState<number[]>([])

    React.useEffect(() => {
        console.log("current", crewMovies)
    }, [crewMovies])

    React.useEffect(() => {
        async function fetchFilteredMovies() {
            const filteredMovies = []
            const actorsQuery = location.state.castAndCrew.filter((person: {id: number, job: string}) => person.job == "Actor")
            .map((actor: {id: number, job: string}) => {return actor.id}).join("%2C")
            const genresQuery = location.state.genres.join("%2C")
            for (let i = 1; i < 21; i++) {
                const resData = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${i}${location.state.year ? `&primary_release_year=${location.state.year}` : ""}&sort_by=popularity.desc${actorsQuery ? `&with_cast=${actorsQuery}` : ""}${genresQuery ? `&with_genres=${genresQuery}` : ""}${location.state.language ? `&with_original_language=${location.state.language}` : ""}${location.state.runtime ? `&with_runtime.gte=${location.state.runtime - 8}`  : ""}${location.state.runtime ? `&with_runtime.lte=${location.state.runtime + 8}` : ""}`, options)
                const data = await resData.json()
                const pageData = data.results.map((movie : { id: number}) => movie.id)
                filteredMovies.push(pageData)
            }
            const finalList = [].concat(...filteredMovies)
            // console.log(finalList)
            setSearchResults(finalList)
        }

        fetchFilteredMovies();
    }, []);

    const finalFilteredList = crewMovies.length !== 0 ? searchResults.filter((element: number) => crewMovies.includes(element)) : searchResults.length === 20 ? crewMovies : ""
    console.log("final: " + finalFilteredList)

    return (
        <>
            <h1>Hi</h1>
        </>
    )
}