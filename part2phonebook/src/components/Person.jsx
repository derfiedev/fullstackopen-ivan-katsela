export const Person = ({ person, handleClick }) => {
    return (
        <div>
            <p>{person.name}: {person.number} <button value={person.id} onClick={handleClick}>Delete</button></p>
        </div>
    );
}