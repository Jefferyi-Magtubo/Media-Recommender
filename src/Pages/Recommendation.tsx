import React from "react";
import { useLocation } from "react-router-dom";
import { options } from "../APIoptions";


export default function Recommendation() {
    const location = useLocation()

    console.log(location.state.runtime, location.state.year)

    React.useEffect(() => {
        async function getInitialMovie() {
            const res1 = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1
                ${location.state.year ? `&primary_release_year=${location.state.year}` : ""}&sort_by=popularity.desc
                ${location.state.language ? `&with_original_language=${location.state.language}` : ""}
                ${location.state.runtime ? `&with_runtime.gte=${location.state.runtime - 8}`  : ""}
                ${location.state.runtime ? `&with_runtime.lte=${location.state.runtime + 8}` : ""}`, options)
            const filteredMovies = await res1.json()
            console.log(filteredMovies)
        }
        getInitialMovie()
    }, [])
    

    return (
        <>

        </>
    )
}