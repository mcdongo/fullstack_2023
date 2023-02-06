import Person from './Person'

const Persons = ({numbersToShow}) => {
    return (
        <div>
            {numbersToShow.map(person => 
                <Person person={person} key={person.name}/>
            )}
        </div>
    )
}

export default Persons