import express from "express";
import "dotenv/config";
import { students } from "./constant.js";
import cors from "cors"

const app = express();
app.use(express.json())
app.use(cors());

app.get("/api/data",(req,res)=>{
    res.json(students);
})
app.post("/api/data",(req,res)=>{
    const NewStudent = req.body;
    students.push(NewStudent);
    res.status(201).json({success:true});
})

const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log("Server is Successfully Running at",PORT);
});
