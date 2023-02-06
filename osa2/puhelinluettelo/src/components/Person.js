const Person = (props) => {
    return (
        <div>
            <p>{props.name} {props.number} <button onClick={e => props.handleDelete(props.name)}>delete</button></p>
        </div>
    )
}

export default Person