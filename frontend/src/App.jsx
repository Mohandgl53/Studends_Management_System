import { useState, useEffect } from "react";
import Header from "./components/Header";
import StudentControl from "./components/StudentControl";
import Display from "./components/Display";
import Footer from "./components/Footer";

function App() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/data");
        if (!response.ok) {
          throw new Error("Network Error");
        }
      
      const data = await response.json();
      setStudents(data);

      }catch (err) {
        console.error(err.message);
      } 
    }
    fetchData();
  }, [])

  return (
    <div className="App">
      <Header title="Student Management System" />
      <StudentControl
        search={search}
        setSearch={setSearch}
      />
      <Display 
        students={students} 
        search={search}
      />
      <Footer />
    </div>
  );
}

export default App;