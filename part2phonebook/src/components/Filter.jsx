export const Filter = ({ filter, setFilter }) => {
    return (
        <div>
            <h2>Filter</h2>
            Show only with: <input value={filter} onChange={(e) => setFilter(e.target.value)} />
        </div>
    );
}