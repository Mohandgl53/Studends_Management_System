import mongoose from "mongoose";

const StudentsSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    rollno: {
        type: String,
        required: true,
        unique: true
    },
    dept: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contact: {
        type: String,
        required: true,
        unique: true
    }


})

export const Students = mongoose.model("Students", StudentsSchema)
