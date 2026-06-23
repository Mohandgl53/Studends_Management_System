function StudentControl({search, setSearch}){
    
    return(
        <div>
            <input 
                id="search"
                type="text"
                placeholder="Search by name, rollno..."
                value={search}
                onChange={e=>setSearch(e.target.value)}
            />
            <button id="addstud-btn">Add New Student</button>
        </div>
    )
}

export default StudentControl;