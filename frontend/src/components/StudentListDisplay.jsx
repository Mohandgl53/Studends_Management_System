import { Link } from "react-router-dom"
import { useMemo } from "react"

function StudentListDisplay({ students, search, selectedDepart, loading }) {

    const filteredStudents = useMemo(() =>
        students
            .filter(student =>
                (student.name?.toLowerCase() ?? '').includes(search.toLowerCase())
                ||
                (student.rollno?.toLowerCase() ?? '').includes(search.toLowerCase())
            )
            .filter(student =>
                selectedDepart === "All" || selectedDepart === ""
                || (student.dept ?? '') === selectedDepart
            ),
        [students, search, selectedDepart]
    )

    return (
        <div id="StudentListDisplay">
            {loading ? (
                <div className="spinner-container">
                    <div className="spinner"></div>
                    <p>Loading students...</p>
                </div>
            ) : filteredStudents.length === 0 ? (
                <p className="no-students">No student found</p>
            ) : (
                <ul>
                    <li id="stud_head">
                        <p>S.No</p>
                        <p>Roll no</p>
                        <p>Name</p>
                        <p>Department</p>
                    </li>
                    {filteredStudents.map((student, index) => (
                        <li key={student.id} className="stud_info">
                            <Link to={`/student/${student.id}`}>
                                <p>{index + 1}</p>
                                <p>{student.rollno}</p>
                                <p>{student.name}</p>
                                <p>{student.dept}</p>
                            </Link>
                        </li>))}
                </ul>
            )}
        </div>
    )
}

export default StudentListDisplay;