const NoteForm = ({ handleAddition, title, setTitle, author, setAuthor, url, setUrl}) => {
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleAddition}>
                title:<input type='text' name='title' value={title} onChange={({ target }) => setTitle(target.value)}/><br />
                author:<input type='text' name='author' value={author} onChange={({ target }) => setAuthor(target.value)}/><br />
                url:<input type='text' name='url' value={url} onChange={({ target }) => setUrl(target.value)} /><br />
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default NoteForm 