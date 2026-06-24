import { useState, useEffect } from "react";
import Header from "./components/Header";
import StudentControl from "./components/StudentControl";
import AddStudentModal from "./components/AddStudentModal";
import Display from "./components/Display";
import Footer from "./components/Footer";

function App() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedDepart, setSelectedDepart] = useState('');
  const [showAddStud, setShowAddStud] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/data");
        if (!response.ok) {
          throw new Error("Network Error");
        }

        const data = await response.json();
        setStudents(data);

      } catch (err) {
        console.error(err.message);
      }
    }
    fetchData();
  }, [])

  const handleAddStudent = async (data)=>{
    const newStudent = {id:students.length+1,...data};
    console.log(newStudent);
    try{  
    const response = await fetch("http://localhost:3000/api/data", {
      method:"POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newStudent)
    })
    const res = await response.json;
    console.log(res)
  }catch(err){
    console.error("Post Api Failed:",err.message);
  }
  }

  return (
    <div className="App">
      <Header title="Student Management System" />
      <StudentControl
        search={search}
        setSearch={setSearch}
        selectedDepart={selectedDepart}
        setSelectedDepart={setSelectedDepart}
        setShowAddStud={setShowAddStud}
      />
      <AddStudentModal
        showAddStud={showAddStud}
        setShowAddStud={setShowAddStud}
        handleAddStudent={handleAddStudent}
      />
      <Display
        students={students}
        search={search}
        selectedDepart={selectedDepart}
      />
      <Footer />
    </div>
  );
}

export default App;