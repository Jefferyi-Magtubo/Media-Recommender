import React from "react";
import './PeopleInput.css'

export default function PeopleInput({people} : {people :{job: string, id: number, name: string}[]}) {
    console.log(people)

    if (!Array.isArray(people)) {
        console.error("ParameterInput: 'people' prop is not an array.");
        return null; // or handle this case in some appropriate way
    }

    const inputElements = people.map((person : {job: string, id: number, name: string}) => {
        return (
                     
                <>
                <label htmlFor={person.id.toString()} key={person.id}><input type="checkbox" id={person.id.toString() } value={person.id}/>{person.name} ({person.job})</label>
                </>
          
        )
    })

    console.log(inputElements)

    return (
        <>
            {inputElements}
        </>
        
    )
}