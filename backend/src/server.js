import express from "express";
import "dotenv/config";
import { students } from "./constant.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/api/data", (req, res) => {
    res.json(students);
});

app.get("/api/data/:id", (req, res) => {
    const studentId = Number(req.params.id);
    const student = students.find((item) => item.id === studentId);

    if (!student) {
        return res.status(404).json({ success: false, message: "Student not found" });
    }

    res.json(student);
});

app.post("/api/data", (req, res) => {
    const newStudent = req.body;
    students.push(newStudent);
    res.status(201).json(newStudent);
});

app.put("/api/data/:id", (req, res) => {
    const studentId = Number(req.params.id);
    const index = students.findIndex((student) => student.id === studentId);

    if (index === -1) {
        return res.status(404).json({ success: false, message: "Student not found" });
    }

    students[index] = { ...students[index], ...req.body, id: studentId };
    res.json(students[index]);
});

app.delete("/api/data/:id", (req, res) => {
    const studentId = Number(req.params.id);
    const index = students.findIndex((student) => student.id === studentId);

    if (index === -1) {
        return res.status(404).json({ success: false, message: "Student not found" });
    }

    students.splice(index, 1);
    res.json({ success: true });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("Server is Successfully Running at", PORT);
});