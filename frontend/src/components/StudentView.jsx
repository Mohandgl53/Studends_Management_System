import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { emptyForm } from "../constants";

const StudentView = ({ formData, setFormData, handleEditStudent, handleDeleteStudent, students }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const studentId = Number(id);
    const selectedStudent = students.find((student) => student.id === studentId);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (selectedStudent) {
            setFormData({ ...selectedStudent });
        }
    }, [selectedStudent, setFormData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedStudent) return;

        const updated = await handleEditStudent({ ...formData, id: selectedStudent.id });

        if (updated) {
            setIsEditing(false);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        if (selectedStudent) {
            setFormData({ ...selectedStudent });
        } else {
            setFormData(emptyForm);
        }
        setIsEditing(false);
    };

    const handleDelete = async () => {
        if (!selectedStudent) return;

        const deleted = await handleDeleteStudent(selectedStudent.id);

        if (deleted) {
            navigate("/", { replace: true });
        }
    };

    if (!selectedStudent) {
        return <p>No student found.</p>;
    }

    return (
        <div id="StudentView">
            <h2>Student Details</h2>
            <form className="StudentView" onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required disabled={!isEditing} />

                <label htmlFor="rollno">Roll No</label>
                <input type="text" id="rollno" name="rollno" value={formData.rollno} onChange={handleChange} required disabled={!isEditing} />

                <label htmlFor="department">Department</label>
                <select id="department" name="dept" value={formData.dept} onChange={handleChange} required disabled={!isEditing}>
                    <option value="">Select Department</option>
                    <option value="AI&DS">AI&DS</option>
                    <option value="CSE">CSE</option>
                    <option value="ECE">ECE</option>
                    <option value="EEE">EEE</option>
                    <option value="MECH">MECH</option>
                </select>

                <label htmlFor="year">Year</label>
                <select id="year" name="year" value={formData.year} onChange={handleChange} required disabled={!isEditing}>
                    <option value="">Select Year</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>

                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required disabled={!isEditing} />

                <label htmlFor="contact">Contact</label>
                <input type="tel" id="contact" name="contact" value={formData.contact} onChange={handleChange} required disabled={!isEditing} />

                <div className="modal-actions">
                    {!isEditing ? (
                        <>
                            <button type="button" className="edit-btn" onClick={handleEdit}>Edit</button>
                            <button type="button" className="delete-btn" onClick={handleDelete}>Delete</button>
                        </>
                    ) : (
                        <>
                            <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
                            <button type="submit" className="submit-btn">Submit</button>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
};

export default StudentView;
