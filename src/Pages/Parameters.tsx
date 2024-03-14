import React from "react";
import { useLocation } from "react-router-dom";
import { options } from '../APIoptions'
import PeopleInput from "../components/PeopleInput/PeopleInput";
import GenreInput from "../components/GenreInput/GenreInput";
import { languages } from "../APIoptions";

export default function Parameters() {

    // Getting information to display the parameters
    const location = useLocation()

    const [actors, setActors] = React.useState<{job: string, id: number, name: string}[]>([])
    const [directorWriter, setDirectorWriter] = React.useState<{job: string, id: number, name: string}[]>([])
    const [otherCrew, setOtherCrew] = React.useState<{job: string, id: number, name: string}[]>([])
    const [movieDetails, setDetails] = React.useState<{release_date: string, original_language: string, runtime: number,genres: {id: number, name: string}[]}>({release_date: "", original_language: "", runtime: 0, genres: []})
    const [language, setLanguage] = React.useState<{english_name: string, iso_639_1: string}[]>([{english_name: "", iso_639_1: ""}])
    
    // React.useEffect(() => {
    //     console.log(language)
    // }, [language])

    React.useEffect(() => {
        async function getMovie() {
            const res1 = await fetch(`https://api.themoviedb.org/3/movie/${location.state.id}/credits?language=en-US`, options)
            const credits = await res1.json()

            const res2 = await fetch(`https://api.themoviedb.org/3/movie/${location.state.id}?language=en-US`, options)
            const details = await res2.json()

            // console.log(details)

            setDetails(details)

            setLanguage(languages.filter((language : {english_name: string, iso_639_1: string}) => {
                return language.iso_639_1 === details.original_language
            }))

            const newActors = credits.cast.slice(0,5).map((person : {job: string, id: number, name: string}) =>  ({"name": person.name, "id": person.id, "job": "Actor"})) 
            setActors(newActors)
           
            const crew = credits.crew.map((person : {job: string, id: number, name: string}) => ({"name": person.name, "id": person.id, "job": person.job}))
            setOtherCrew(crew)

            const directorWriters = crew.filter((crewMember: { job: string, id: number, name: string }) => {
                return crewMember.job === "Director" || crewMember.job === "Writer" || crewMember.job === "Screenplay";
            });

            setDirectorWriter(directorWriters)
        }

        getMovie()
    }, [])

    //Info to be sent to Recommender Page
    const [genresInfo, setGenresInfo] = React.useState<number[]>([])
    const [year, setYear] = React.useState<number>()
    const [runtime, setRuntime] = React.useState<number>()
    const [languageInfo, setLanguageInfo] = React.useState<string>()
    const [behindTheCamera, setBehindTheCamera] = React.useState<number[]>([])
    const [actorsInfo, setActorsInfo] = React.useState<number[]>([])

    function changeGenre(id: number) {
        setGenresInfo(oldgenres => [...oldgenres, id])
        console.log(genresInfo)
    }

    function getInfo() {
        const directorEl = document.getElementById('director') as HTMLInputElement

    }

    return (
        <div className="container parameters">
            <h1 className="question">What did you like about {location.state.title}?</h1>

            <h2 className="parameterSection">Details</h2>

            <GenreInput genres={movieDetails.genres} onClick={changeGenre}/>

            <label htmlFor="year" >
                <input type="checkbox" id="year" value="year"/>Year: {movieDetails.release_date.slice(0,4)}
            </label>

            <label htmlFor="length" >
                <input type="checkbox" id="length" value={movieDetails.runtime}/>Runtime: {movieDetails.runtime} minutes
            </label>

            <label htmlFor="language" >
                <input type="checkbox" id="language" value={movieDetails.original_language}/>Original Language: {language[0].english_name}
            </label>

            <h2 className="parameterSection">Directors/Writers</h2>

            <PeopleInput people={directorWriter} other={false}/>

            <h2 className="parameterSection">Actors</h2>

            <PeopleInput people={actors} other={false}/>

            <h2 className="parameterSection">Other Crew</h2>

            <PeopleInput people={otherCrew} other={true}/>

            <button onClick={() => getInfo()}>Recommend me a movie!</button>
        </div>
    )
}