import './GenreInput.css'

export default function GenreInput({genres} : {genres : {id: number, name: string}[]}) {
    console.log(genres)

    const genreElements = genres.map((genre : {id: number, name: string}) => {
        return (
            <>
                <label htmlFor={genre.id.toString()} key={genre.id}><input type="checkbox" id={genre.id.toString()}  value={genre.id.toString()}/>Genre: {genre.name}</label>
            </>
        )
    })

    return (
        <>
            {genreElements}
        </>
    )
}