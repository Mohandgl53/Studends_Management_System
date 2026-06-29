import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/data` : "/api/data";
import Header from "./components/Header";
import StudentControl from "./components/StudentControl";
import AddStudentModal from "./components/AddStudentModal";
import StudentListDisplay from "./components/StudentListDisplay";
import StudentView from "./components/StudentView";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import { emptyForm } from "./constants";

function App() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedDepart, setSelectedDepart] = useState("");
  const [showAddStud, setShowAddStud] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Network Error");
        }

        const data = await response.json();
        setStudents(data);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
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
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStudent),
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        const message = payload?.message || "Failed to add student";
        window.alert(message);
        return false;
      }

      const createdStudent = payload;
      setStudents((prevStudents) => [...prevStudents, createdStudent]);
      setFormData(emptyForm);
      return true;
    } catch (err) {
      console.error("Post Api Failed:", err.message);
      window.alert(err.message || "Failed to add student");
      return false;
    }
  };

  const handleEditStudent = async (data) => {
    try {
      const response = await fetch(`${API_URL}/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        const message = payload?.message || "Failed to update student";
        window.alert(message);
        return false;
      }

      const updatedStudent = payload;
      setStudents((prevStudents) =>
        prevStudents.map((student) => (student.id === updatedStudent.id ? updatedStudent : student))
      );
      setFormData(updatedStudent);
      return true;
    } catch (err) {
      console.error("Update Api Failed:", err.message);
      window.alert(err.message || "Failed to update student");
      return false;
    }
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      const response = await fetch(`${API_URL}/${studentId}`, {
        method: "DELETE",
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        const message = payload?.message || "Failed to delete student";
        window.alert(message);
        return false;
      }

      setStudents((prevStudents) => prevStudents.filter((student) => student.id !== studentId));
      setFormData(emptyForm);
      return true;
    } catch (err) {
      console.error("Delete Api Failed:", err.message);
      window.alert(err.message || "Failed to delete student");
      return false;
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
                loading={loading}
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
