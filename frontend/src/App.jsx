import { useState, useEffect } from "react";
import Header from "./components/Header";
import StudentControl from "./components/StudentControl";
import AddStudentModal from "./components/AddStudentModal";
import StudentListDisplay from "./components/StudentListDisplay";
import StudentView from "./components/StudentView";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";

const emptyForm = {
  name: "",
  rollno: "",
  dept: "",
  year: "",
  email: "",
  contact: "",
};

function App() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedDepart, setSelectedDepart] = useState("");
  const [showAddStud, setShowAddStud] = useState(false);
  const [formData, setFormData] = useState(emptyForm);

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
    };

    fetchData();
  }, []);

  const handleAddStudent = async (data) => {
    const newStudent = {
      id: students.length ? Math.max(...students.map((student) => student.id)) + 1 : 1,
      ...data,
    };

    try {
      const response = await fetch("http://localhost:3000/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStudent),
      });

      if (!response.ok) {
        throw new Error("Failed to add student");
      }

      const createdStudent = await response.json();
      setStudents((prevStudents) => [...prevStudents, createdStudent]);
      setFormData(emptyForm);
      setShowAddStud(false);
    } catch (err) {
      console.error("Post Api Failed:", err.message);
    }
  };

  const handleEditStudent = async (data) => {
    try {
      const response = await fetch(`http://localhost:3000/api/data/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update student");
      }

      const updatedStudent = await response.json();
      setStudents((prevStudents) =>
        prevStudents.map((student) => (student.id === updatedStudent.id ? updatedStudent : student))
      );
      setFormData(updatedStudent);
    } catch (err) {
      console.error("Update Api Failed:", err.message);
    }
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/data/${studentId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete student");
      }

      setStudents((prevStudents) => prevStudents.filter((student) => student.id !== studentId));
      setFormData(emptyForm);
    } catch (err) {
      console.error("Delete Api Failed:", err.message);
    }
  };

  return (
    <div className="App">
      <Header title="Student Management System" />

      <Routes>
        <Route
          path="/"
          element={
            <>
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
                formData={formData}
                setFormData={setFormData}
              />
              <StudentListDisplay
                students={students}
                search={search}
                selectedDepart={selectedDepart}
              />
            </>
          }
        />
        <Route
          path="/student/:id"
          element={
            <StudentView
              formData={formData}
              setFormData={setFormData}
              handleEditStudent={handleEditStudent}
              handleDeleteStudent={handleDeleteStudent}
              students={students}
            />
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
