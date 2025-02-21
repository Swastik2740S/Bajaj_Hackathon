
const mongoose = require('mongoose');
const PersonalInfoSchema = require('../models/PersonalInfoSchema');

const workoutSchema = new mongoose.Schema({
  nameWorkout: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  repetition: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now  // Ensures valid date format
  }
});

const UserSchema = new mongoose.Schema({
  emailId: {
    type: String,
    required: true,
    unique: true,
    sparse: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  mobile: {
    type: String
  },
  dateofbirth: {
    type: Date
  },
  nickname: {
    type: String
  },
  workouts: [workoutSchema],
  date: {
    type: Date,
    default: Date.now
  },
  personalInfo: [PersonalInfoSchema]
});

module.exports = mongoose.model('User', UserSchema);
