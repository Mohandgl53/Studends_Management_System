function StudentControl({ search, setSearch, selectedDepart, setSelectedDepart, setShowAddStud }) {

    return (
        <div id="StudentControl">
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
                <option value="AI&DS">AI&DS</option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="MECH">MECH</option>
            </select>
            <button id="addstud-btn" onClick={() => setShowAddStud(true)}>Add New Student</button>
        </div>
    )
}

export default StudentControl;