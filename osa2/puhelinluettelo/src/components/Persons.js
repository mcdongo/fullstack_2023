import Person from './Person'

const Persons = (props) => {
    return (
        <div>
            {props.numbersToShow.map(person => 
                <Person name={person.name} number={person.number} handleDelete={props.handleDelete} key={person.name}/>
            )}
        </div>
    )
}

export default Persons