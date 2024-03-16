import './PeopleInput.css'

export default function PeopleInput({people, other, onClick} : {people :{job: string, id: number, name: string}[], other: any, onClick: Function} ) {

    const inputElements = people.map((person : {job: string, id: number, name: string}) => {

        const jobsToCheck = other  ?
            ["Visual Effects Supervisor", "Special Effects Supervisor", "Set Decoration", "Original Music Composer", "Costume Design", "Composer"]:
            ["Actor", "Director", "Writer", "Screenplay"]
        

        if(jobsToCheck.includes(person.job)) {
            return (       
                <div key={person.id.toString() + person.job}>
                    <input type="checkbox" id={person.id.toString() + person.job} value={person.id} onClick={() => onClick(person.id, person.job)}/>
                    <label htmlFor={person.id.toString() + person.job}>
                    {person.name} ({person.job})
                    </label>
                </div>
            )
        }

    })

    return (
        <>
            {inputElements}
        </>
    )
}