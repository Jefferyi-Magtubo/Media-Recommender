import React from "react"
import { useLocation} from "react-router-dom"
import { options } from '../APIoptions'
import PeopleInput from "../components/PeopleInput/PeopleInput"
import GenreInput from "../components/GenreInput/GenreInput"
import { fetchLanguages } from "../APIoptions"
import { NavLink } from "react-router-dom"

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

            setDetails(details)

            const languageData = await fetchLanguages()
            setLanguage(languageData.filter((language : {english_name: string, iso_639_1: string}) => {
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

    //Info to be sent to Recommender Page and the functions to change their values
    const [genresInfo, setGenresInfo] = React.useState<number[]>([])
    const [year, setYear] = React.useState<number>()
    const [runtime, setRuntimeInfo] = React.useState<number>(0)
    const [languageInfo, setLanguageInfo] = React.useState<string>()
    const [castAndCrew, setCastAndCrewInfo] = React.useState<{id: number, job: string}[]>([])

    function changeGenre(id: number) {
        if(!genresInfo.includes(id)) {
            setGenresInfo(oldgenres => [...oldgenres, id])
        } else {
            setGenresInfo(oldgenres => oldgenres.filter(genre => genre !== id))
        }
    }

    function changeYear(movieYear: number) {
        if(year) {
            setYear(0)
        } else {
            setYear(movieYear)
        }
    }   

    function changeRuntime(minutes: number) {
        if(runtime) {
            setRuntimeInfo(0)
        } else {
            setRuntimeInfo(minutes)
        }
    }

    function changeLanguage(language: string) {
        if(languageInfo) {
            setLanguageInfo("")
        } else {
            setLanguageInfo(language)
        }
    }

    function changeCastAndCrew(id: number, job: string) {

        const personIndex = castAndCrew.findIndex(person => person.id === id && person.job === job);

        if (personIndex !== -1) {
            setCastAndCrewInfo(oldActorsAndCrew => {
                const updatedCastAndCrew = [...oldActorsAndCrew];
                updatedCastAndCrew.splice(personIndex, 1); // Removing the element
                return updatedCastAndCrew; // Returning the modified array

            });
        } else if (personIndex === -1) {
            setCastAndCrewInfo(oldActorsAndCrew => [...oldActorsAndCrew, {id: id, job: job}]);
        } else {
            return
        }
    }

    React.useEffect(() => {
        console.log("checking",castAndCrew);
    }, [castAndCrew]);

    return (
        <div className="container parameters">
            <h1 className="question">What did you like about {location.state.title}?</h1>

            <h2 className="parameterSection">Details</h2>

            <GenreInput genres={movieDetails.genres} onClick={changeGenre}/>

            <label htmlFor="year" onClick={() => changeYear(Number(movieDetails.release_date.slice(0,4)))}>
                <input type="checkbox" id="year" value="year" onClick={() => changeYear(Number(movieDetails.release_date.slice(0,4)))}/>Year: {movieDetails.release_date.slice(0,4)}
            </label>

            <label htmlFor="length" onClick={() => changeRuntime(movieDetails.runtime)}>
                <input type="checkbox" id="length" value={movieDetails.runtime}/>Runtime: {movieDetails.runtime} minutes
            </label>

            <label htmlFor="language" onClick={() => changeLanguage(movieDetails.original_language)}>
                <input type="checkbox" id="language" value={movieDetails.original_language}/>Original Language: {language[0].english_name}
            </label>

            <h2 className="parameterSection">Directors/Writers</h2>

            <PeopleInput people={directorWriter} other={false} onClick={changeCastAndCrew}/>

            <h2 className="parameterSection">Actors</h2>

            <PeopleInput people={actors} other={false} onClick={changeCastAndCrew}/>

            <h2 className="parameterSection">Other Crew</h2>

            <PeopleInput people={otherCrew} other={true} onClick={changeCastAndCrew}/>

            {genresInfo.length !== 0 || year || runtime !== 0 || languageInfo || castAndCrew.length !== 0 ?
                <NavLink to="/recommendation" state={{currentMovie: location.state.id, genres: genresInfo, year: year, runtime: runtime, language: languageInfo, castAndCrew: castAndCrew}} className={"button"}>
                    Recommend me a movie!
                </NavLink> :
                null
            }
        </div>
    )
}