import React from "react";
import './PeopleInput.css'

export default function PeopleInput({people} : {people :{job: string, id: number, name: string}[]}) {
    console.log(people)

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