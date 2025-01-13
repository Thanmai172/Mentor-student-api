const Mentor = require('../models/MentorModel');

// Fetch all mentors
const getAllMentors = async (req, res) => {
    try {
        const mentors = await Mentor.find().populate({
            path: 'students',
            select: 'name'  // Only fetch the 'name' field for students
        });
        res.status(200).json(mentors);
    } catch (error) {
        res.status(500).json({ message: "Error fetching mentors", error });
    }
};

// Fetch mentor by ID and populate student details
const getMentorById = async (req, res) => {
    try {
        const mentor = await Mentor.findById(req.params.mentorId)
            .populate('students'); // Populate student details
        if (!mentor) {
            return res.status(404).json({ message: "Mentor not found" });
        }
        res.status(200).json(mentor);
    } catch (error) {
        res.status(500).json({ message: "Error fetching mentor", error });
    }
};


const createMentor = async (req, res) => {
    try {
        const { name, email } = req.body;
        const newMentor = await Mentor.create({ name, email });
        res.status(201).json(newMentor);
    } catch (error) {
        res.status(500).json({ message: "Error creating mentor", error });
    }
};

const getStudentsForMentor = async (req, res) => {
    try {
        const mentor = await Mentor.findById(req.params.mentorId).populate('students');
        if (!mentor) {
            return res.status(404).json({ message: 'Mentor not found' });
        }
        res.status(200).json(mentor.students);
    } catch (error) {
        res.status(500).json({ message: "Error fetching students for mentor", error });
    }
};

const assignStudentsToMentor = async (req, res) => {
    const { mentorId, studentIds } = req.body;
    try {
        const mentor = await Mentor.findById(mentorId);
        if (!mentor) {
            return res.status(404).json({ message: 'Mentor not found' });
        }
        mentor.students.push(...studentIds);
        await mentor.save();
        res.status(200).json({ message: "Students assigned successfully", mentor });
    } catch (error) {
        res.status(500).json({ message: "Error assigning students", error });
    }
};

module.exports = {
    getAllMentors,
    createMentor,
    getMentorById,
    getStudentsForMentor,
    assignStudentsToMentor
};
