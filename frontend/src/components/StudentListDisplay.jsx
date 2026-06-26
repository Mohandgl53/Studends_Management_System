import { Link } from "react-router-dom"

function StudentListDisplay({ students, search, selectedDepart }) {

    return (
        <div id="StudentListDisplay">
            <ul>
                <li id="stud_head">
                    <p>S.No</p>
                    <p>Roll no</p>
                    <p>Name</p>
                    <p>Department</p>
                </li>
                {students
                    .filter(student =>
                        (student.name?.toLowerCase() ?? '').includes(search.toLowerCase())
                        ||
                        (student.rollno?.toLowerCase() ?? '').includes(search.toLowerCase())
                    )
                    .filter(student =>
                        selectedDepart === "All" || selectedDepart === ""
                        || (student.dept?.toLowerCase() ?? '') === selectedDepart
                    )
                    .map((student, index) => (
                        <li key={student.id} className="stud_info">
                            <Link to={`/student/${student.id}`}>
                                <p>{index + 1}</p>
                                <p>{student.rollno}</p>
                                <p>{student.name}</p>
                                <p>{student.dept}</p>
                            </Link>
                        </li>))}
            </ul>
        </div>
    )
}

export default StudentListDisplay;