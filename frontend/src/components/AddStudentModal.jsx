

const AddStudentModal = ({ showAddStud, setShowAddStud, handleAddStudent, formData, setFormData }) => {

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddStudent(formData);
    setFormData({ name: "", rollno: "", dept: "", year: "", email: "", contact: "" });
    setShowAddStud(false);
  };

  const handleCancel = () => {
    setFormData({ name: "", rollno: "", dept: "", year: "", email: "", contact: "" });
    setShowAddStud(false);
  };

  return (
    showAddStud && (
      <div id="AddStudentModalOverlay">
        <div id="AddStudentModal">
          <h2>Add New Student</h2>
          <form className="AddStudentForm" onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

            <label htmlFor="rollno">Roll No</label>
            <input type="text" id="rollno" name="rollno" value={formData.rollno} onChange={handleChange} required />

            <label htmlFor="department">Department</label>
            <select id="department" name="dept" value={formData.dept} onChange={handleChange} required>
              <option value="">Select Department</option>
              <option value="AI&DS">AI&DS</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="MECH">MECH</option>
            </select>

            <label htmlFor="year">Year</label>
            <select id="year" name="year" value={formData.year} onChange={handleChange} required>
              <option value="">Select Year</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>

            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

            <label htmlFor="contact">Contact</label>
            <input type="tel" id="contact" name="contact" value={formData.contact} onChange={handleChange} required />

            <div className="modal-actions">
              <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
              <button type="submit" className="submit-btn">Submit</button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default AddStudentModal;
