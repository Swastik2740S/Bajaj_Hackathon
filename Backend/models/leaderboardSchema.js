const mongoose = require('mongoose');

const LeaderboardSchema = new mongoose.Schema({
  emailId: {
    type: String,
    required: true,
    unique: true
  },
  totalRepetitions: {
    type: Number,
    default: 0
  },
  score: {
    type: Number,
    default: 0
  }
});

// // Function to update leaderboard
// LeaderboardSchema.statics.updateLeaderboard = async function () {
//   const User = mongoose.model('User'); // Fetch User model

//   const users = await User.find();

//   for (const user of users) {
//     let totalRepetitions = 0;

//     user.workouts.forEach(workout => {
//       totalRepetitions += workout.repetition;
//     });

//     const score = totalRepetitions * 5;

//     await this.findOneAndUpdate(
//       { emailId: user.emailId },
//       { totalRepetitions, score },
//       { upsert: true, new: true }
//     );
//   }
// };

module.exports = mongoose.models.Leaderboard || mongoose.model('Leaderboard', LeaderboardSchema);

