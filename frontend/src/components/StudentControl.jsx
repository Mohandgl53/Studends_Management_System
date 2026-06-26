

function StudentControl({ search, setSearch, selectedDepart, setSelectedDepart, setShowAddStud }) {

    return (
        <div>
            <input
                id="search"
                type="text"
                placeholder="Search by name, rollno..."
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <select
                name="Department"
                id="selectdept"
                value={selectedDepart}
                onChange={e => setSelectedDepart(e.target.value)}
            >
                <option value="" disabled hidden>Department</option>
                <option value="All">All</option>
                <option value="ai&ds">AI&DS</option>
                <option value="cse">CSE</option>
                <option value="ece">ECE</option>
                <option value="eee">EEE</option>
                <option value="mech">MECH</option>
            </select>
            <button id="addstud-btn" onClick={() => setShowAddStud(true)}>Add New Student</button>
        </div>
    )
}

export default StudentControl;