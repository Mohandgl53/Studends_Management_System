import express from "express";
import "dotenv/config";
import { students } from "./constant.js";
import cors from "cors"

const app = express();
app.use(cors());

app.get("/api/data",(req,res)=>{
    res.json(students);
})

const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log("Server is Successfully Running at",PORT);
});