const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor' }, // Referencing current mentor
    previousMentor: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor' } // Referencing previous mentor
});

module.exports = mongoose.model('Student', studentSchema);
