const express = require('express');
const router = express.Router();
const mentorController = require('../controllers/mentorController');

// Fix: Added a route to get all mentors
router.get('/', mentorController.getAllMentors);

router.post('/', mentorController.createMentor);
router.get('/:mentorId/students', mentorController.getStudentsForMentor);
router.post('/assign-students', mentorController.assignStudentsToMentor);
router.get('/:mentorId', mentorController.getMentorById); // Fetch mentor by ID


module.exports = router;
