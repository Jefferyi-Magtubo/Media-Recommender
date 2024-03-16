import './GenreInput.css'

export default function GenreInput({genres, onClick} : {genres : {id: number, name: string}[], onClick: Function}) {
    // console.log(genres)

    const genreElements = genres.map((genre : {id: number, name: string}) => {
        return (
            <div key={genre.id.toString()}>
                <label htmlFor={genre.id.toString()} key={genre.id}>
                    <input type="checkbox" id={genre.id.toString()}  value={genre.id.toString() } onClick={() => onClick(genre.id)}/>Genre: {genre.name}
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