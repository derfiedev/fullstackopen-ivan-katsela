import { Person } from "./Person";

export const ViewPersons = ({ persons, handleClick, filter }) => {
    if (persons.length === 0) {
        return <div>No entries</div>;

    }

    if (filter) {
        const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));
        return (
            <div>
                <h2>Entries:</h2>
                {filteredPersons.map(person => (
                    <Person key={person.id} person={person} handleClick={handleClick} />
                ))}
            </div>
        );
    }

    return (
        <div>
            <h2>Entries:</h2>
            {persons.map(person => (
                <Person key={person.id} person={person} handleClick={handleClick} />
            ))}
        </div>
    );
}