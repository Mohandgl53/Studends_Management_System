import { Students } from "../model/Students.js";
import { handleDuplicateError, handleValidationError } from "../middleware/errorHandler.js";

export const getAllStudents = async (req, res) => {
    const students = await Students.find();
    res.json(students);
};

export const getStudentById = async (req, res) => {
    const student = await Students.findOne({ id: Number(req.params.id) });

    if (!student) {
        return res.status(404).json({ success: false, message: "Student not found" });
    }

    res.json(student);
};

export const createStudent = async (req, res) => {
    try {
        const student = new Students(req.body);
        const savedStudent = await student.save();
        res.status(201).json(savedStudent);
    } catch (error) {
        const duplicateError = handleDuplicateError(error);

        if (duplicateError) {
            return res.status(duplicateError.status).json({ success: false, message: duplicateError.message });
        }

        if (handleValidationError(error, res)) return;

        console.error(error);
        res.status(500).json({ success: false, message: "Failed to add student" });
    }
};

export const updateStudent = async (req, res) => {
    try {
        const updatedStudent = await Students.findOneAndUpdate(
            { id: Number(req.params.id) },
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        res.json(updatedStudent);
    } catch (error) {
        const duplicateError = handleDuplicateError(error);

        if (duplicateError) {
            return res.status(duplicateError.status).json({ success: false, message: duplicateError.message });
        }

        if (handleValidationError(error, res)) return;

        console.error(error);
        res.status(500).json({ success: false, message: "Failed to update student" });
    }
};

export const deleteStudent = async (req, res) => {
    try {
        const deletedStudent = await Students.findOneAndDelete({ id: Number(req.params.id) });

        if (!deletedStudent) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to delete student" });
    }
};
