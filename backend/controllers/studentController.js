const Student = require('../models/StudentModel');
const Mentor = require('../models/MentorModel');

// CREATE a new student
const createStudent = async (req, res) => {
    try {
        const { name, mentor } = req.body;
        const student = new Student({ name, mentor });
        await student.save();
        res.status(201).json(student);
    } catch (error) {
        res.status(500).json({ message: "Error creating student", error });
    }
};

// Assign a student to a mentor
const assignStudentToMentor = async (req, res) => {
    try {
        const { studentId, mentorId } = req.params;
        const student = await Student.findById(studentId);
        const mentor = await Mentor.findById(mentorId);

        if (!student || !mentor) {
            return res.status(404).json({ error: 'Student or Mentor not found' });
        }

        student.mentor = mentorId;
        await student.save();

        mentor.students.push(studentId);
        await mentor.save();

        res.status(200).json({ message: 'Student assigned successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error assigning student' });
    }
};

// Change a student's mentor
const changeMentor = async (req, res) => {
    try {
        const { studentId, mentorId } = req.params;
        const student = await Student.findById(studentId);
        const newMentor = await Mentor.findById(mentorId);

        if (!student || !newMentor) {
            return res.status(404).json({ error: 'Student or Mentor not found' });
        }

        student.previousMentor = student.mentor;
        student.mentor = mentorId;
        await student.save();

        res.status(200).json({ message: 'Mentor changed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error changing mentor' });
    }
};

// GET all students
const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find().populate('mentor');
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: "Error fetching students", error });
    }
};

const getPreviousMentor = async (req, res) => {
    try {
        console.log("Fetching previous mentor for student:", req.params.studentId); // Debugging log
        const student = await Student.findById(req.params.studentId).populate('previousMentor');
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        console.log("Student found:", student); // Debugging log
        res.status(200).json(student.previousMentor);
    } catch (error) {
        console.error("Error in getPreviousMentor:", error); // Log the error
        res.status(500).json({ message: "Error fetching previous mentor", error });
    }
};


module.exports = {
    createStudent,
    assignStudentToMentor,
    getAllStudents,
    changeMentor,
    getPreviousMentor
};
