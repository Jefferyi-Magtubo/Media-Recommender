import './GenreInput.css'

export default function GenreInput({genres, onClick} : {genres : {id: number, name: string}[], onClick: Function}) {

    const genreElements = genres.map((genre : {id: number, name: string}) => {
        return (
            <div key={genre.id.toString()}>
                <input type="checkbox" id={genre.id.toString()}  value={genre.id.toString() } onClick={() => onClick(genre.id)}/>
                <label htmlFor={genre.id.toString()}>
                    Genre: {genre.name}
                </label>
            </div>
        )
    })

    return (
        <>
            {genreElements}
        </>
    )
}