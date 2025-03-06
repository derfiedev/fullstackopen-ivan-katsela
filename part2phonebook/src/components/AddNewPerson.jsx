import axios from "axios";

export const AddNewPerson = ({ persons, setPersons, newName, setNewName, newPhone, setNewPhone, increment, setIncrement }) => {
    const addPerson = (event) => {
        event.preventDefault();

        if (persons.find(person => person.name === newName)) {
            const person = persons.find(person => person.name === newName);
            const updatedPerson = { ...person, number: newPhone };

            axios
                .put(`http://localhost:3001/persons/${person.id}`, updatedPerson)
                .then(response => {
                    setPersons(persons.map(p => p.id !== person.id ? p : response.data));
                    setNewName('');
                    setNewPhone('');
                });
        }
        const personObject = {
            name: newName,
            number: newPhone,
            id: increment
        };

        setPersons(persons.concat(personObject));
        setNewName('');
        setNewPhone('');
        setIncrement(increment + 1);
        axios.post('http://localhost:3001/persons', personObject);
    };

    return (
        <div>
            <h2>Add a new</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
                </div>
                <div>
                    phone: <input value={newPhone} onChange={(e) => setNewPhone(e.target.value)} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    );
}