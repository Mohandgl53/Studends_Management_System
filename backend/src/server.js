import express from "express";
import "dotenv/config";
import { students } from "./constant.js";
import cors from "cors";
import Student from "./models/Student.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/api/data", async (req, res) => {
    const student = await Student.find();
    res.json(students);
});

app.get("/api/data/:id", async (req, res) => {
    const student = await Students.findById(req.params.id);

    if (!student) {
        return res.status(404).json({ success: false, message: "Student not found" });
    }

    res.json(student);
});

app.post("/api/data", async (req, res) => {
    const student = await Student(req.body);
    const savedStudent = await student.save();
    res.status(201).json(savedStudent);
});

app.put("/api/data/:id", (req, res) => {
    const updatedStudent =
    await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true
        }
    );

res.json(updatedStudent);
});

app.delete("/api/data/:id", (req, res) => {

    await Student.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("Server is Successfully Running at", PORT);
});