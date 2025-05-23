import axios from "axios";

export const AddNewPerson = ({ persons, setPersons, newName, setNewName, newPhone, setNewPhone }) => {
    const addPerson = (event) => {
        event.preventDefault();
        if (persons.find(person => person.name === newName)) {
            const confirm = window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`);
            if (!confirm) return;
            const person = persons.find(person => person.name === newName);
            const updatedPerson = { ...person, number: newPhone };

            axios
                .put(`http://localhost:3001/api/person/${person.id}`, updatedPerson)
                .then(response => {
                    setPersons(persons.map(p => p.id !== person.id ? p : response.data));
                    setNewName('');
                    setNewPhone('');
                });
            return;
        }
        const personObject = {
            name: newName,
            number: newPhone
        };

        axios.post('http://localhost:3001/api/person', personObject)
            .then(response => {
                setPersons(persons.concat(response.data));
                setNewName('');
                setNewPhone('');
            });
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