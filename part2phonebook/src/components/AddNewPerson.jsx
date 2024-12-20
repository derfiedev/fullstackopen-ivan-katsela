export const AddNewPerson = ({ persons, setPersons, newName, setNewName, newPhone, setNewPhone, increment, setIncrement }) => {
    const addPerson = (event) => {
        event.preventDefault();
        if (persons.find(person => person.name === newName)) {
            alert(`${newName} is already added to phonebook`);
            return;
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