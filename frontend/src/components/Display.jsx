

function Display({ students, search, selectedDepart }) {

    return (
        <div id="Display">
            <ul>
                <li id="stud_head">
                    <p>S.No</p>
                    <p>Roll no</p>
                    <p>Name</p>
                    <p>Department</p>
                </li>
                {students
                    .filter(student =>
                        student.name.toLowerCase().includes(search.toLowerCase())
                        || 
                        student.rollno.toLowerCase().includes(search.toLowerCase())
                    )
                    .filter(student =>
                        selectedDepart === "All" || selectedDepart === ""
                        || student.dept.toLowerCase() === selectedDepart
                    )
                    .map((student,index) => (
                        <li key={student.id} className="stud_info">
                            <p>{index+1}</p>
                            <p>{student.rollno}</p>
                            <p>{student.name}</p>
                            <p>{student.dept}</p>
                        </li>))}
            </ul>
        </div>
    )
}

export default Display;