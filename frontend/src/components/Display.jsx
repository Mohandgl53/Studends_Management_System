

function Display({students, search}){

    ///

    return(
        <div>
            <ul>
                <li id="stud_head">
                    <p>Id</p>
                    <p>Roll no</p>
                    <p>Name</p>
                    <p>Department</p>
                </li>
                {students.filter(student=> 
                ((student.name).toLowerCase()).includes(search.toLowerCase()))
                .map((student)=>( 
                <li  key={student.id} className="stud_info">
                    <p>{student.id}</p>
                    <p>{student.rollno}</p>
                    <p>{student.name}</p>
                    <p>{student.dept}</p>
                </li>))}
            </ul>
        </div>
    )
}

export default Display;