const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/', studentController.getAllStudents);
router.post('/', studentController.createStudent);
router.put('/:studentId/mentor/:mentorId', studentController.changeMentor);
router.get('/:studentId/previous-mentor', studentController.getPreviousMentor); // Route for previous mentor
router.put('/:studentId/assign/:mentorId', studentController.assignStudentToMentor);

module.exports = router;
