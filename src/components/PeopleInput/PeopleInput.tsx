import './PeopleInput.css'

export default function PeopleInput({people, other, onClick} : {people :{job: string, id: number, name: string}[], other: any, onClick: Function} ) {
    // console.log(people)

    const inputElements = people.map((person : {job: string, id: number, name: string}) => {

        const jobsToCheck = other  ?
            ["Visual Effects Supervisor", "Special Effects Supervisor", "Set Decoration", "Original Music Composer", "Costume Design", "Composer"]:
            ["Actor", "Director", "Writer", "Screenplay"]
        

        if(jobsToCheck.includes(person.job)) {
            return (       
                <div key={person.id.toString() + person.job}>
                    <label htmlFor={person.id.toString() + person.job} key={person.id} onClick={() => onClick(person.id, person.job)}>
                        <input type="checkbox" id={person.id.toString() + person.job} value={person.id} key={person.id}/>{person.name} ({person.job})
                    </label>
                </div>
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