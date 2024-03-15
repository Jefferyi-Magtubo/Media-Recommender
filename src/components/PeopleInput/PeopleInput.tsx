import React from "react";
import './PeopleInput.css'

export default function PeopleInput({people, other, onClick} : {people :{job: string, id: number, name: string}[], other: any, onClick: Function} ) {
    // console.log(people)

    const inputElements = people.map((person : {job: string, id: number, name: string}) => {

        const jobsToCheck = other  ?
            ["Visual Effects Supervisor", "Special Effects Supervisor", "Set Decoration", "Original Music Composer", "Costume Design", "Composer"]:
            ["Actor", "Director", "Writer", "Screenplay"]
        

        if(jobsToCheck.includes(person.job)) {
            return (       
                <>
                    <label htmlFor={person.id.toString()} key={person.id} onClick={() => onClick(person.id, person.job)}>
                        <input type="checkbox" id={person.id.toString() } value={person.id} key={person.id}/>{person.name} ({person.job})
                    </label>
                </>
            )
        }

    })

    // console.log(inputElements)

    return (
        <>
            {inputElements}
        </>
    )
}