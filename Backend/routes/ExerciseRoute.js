// Updated Exercise Routes (exerciseRoutes.js)
const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Exercise = require('../models/ExerciseSchema');
const User = require('../models/UserSchema');
const Leaderboard = require('../models/LeaderboardSchema');

// Point system for each exercise
const exercisePoints = {
    "Squat": 4,
    "Push-Ups": 5,
    "Jumping Jacks": 2,
    "Curls": 6,
    "Lunges": 4
};

// Fetch all Exercises
router.post("/getAllExercises", async (req, res) => {
    try {
        const user = await User.findOne({ emailId: req.body.userId });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user.workouts);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

// Fetch a particular type of Exercise
router.post("/getactivitybyid", async (req, res) => {
    try {
        const activity = await Exercise.findOne({ '_id': req.body.exid });
        res.send(activity);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

// Add Exercise and Update Leaderboard
// Add Exercise and Update Leaderboard
// Add Exercise and Update Leaderboard
// router.post("/scores", async (req, res) => {
//      try {
//          const { emailId, newScore } = req.body;
//          const user = await User.findOne({ emailId });
 
//          if (!user) return res.status(404).send({ message: 'User not found' });
 
//          // Debug: Check workout name
//          console.log("Workout Name:", newScore.nameWorkout);
 
//          // Calculate points for the workout
//          const points = exercisePoints[newScore.nameWorkout];
//          console.log("Points for workout:", points); // <-- Debug log
 
//          if (!points) return res.status(400).send({ message: 'Invalid workout name' });
 
//          newScore.score = points * newScore.repetition;
 
//          // Debug: Check final score
//          console.log("Final Score for workout:", newScore.score);
 
//          // Add workout to user
//          user.workouts.push(newScore);
//          await user.save();
 
//          // Update leaderboard
//          const totalRepetitions = user.workouts.reduce((sum, w) => sum + w.repetition, 0);
//          const totalScore = user.workouts.reduce((sum, w) => 
//              sum + (exercisePoints[w.nameWorkout] || 3) * w.repetition, 0
//          );
 
//          await Leaderboard.findOneAndUpdate(
//              { emailId: user.emailId },
//              { totalRepetitions, score: totalScore },
//              { upsert: true, new: true }
//          );
 
//          res.send({ message: 'Workout added and leaderboard updated' });
//      } catch (err) {
//          console.error(err);
//          res.status(500).send({ message: 'Error adding workout and updating leaderboard' });
//      }
//  });

router.post("/scores", async (req, res) => {
     try {
         const { emailId, newScore } = req.body;
         const user = await User.findOne({ emailId });
 
         if (!user) return res.status(404).send({ message: 'User not found' });
 
         // Debug: Check workout name
         console.log("Workout Name:", newScore.nameWorkout);
 
         // Calculate points for the workout
         const points = exercisePoints[newScore.nameWorkout];
         console.log("Points for workout:", points);
 
         if (!points) return res.status(400).send({ message: 'Invalid workout name' });
 
         newScore.score = points * newScore.repetition;
         console.log("Final Score for workout:", newScore.score);
 
         // Fix: Save workout before calculating totals
         user.workouts.push(newScore);
         await user.save();
         console.log("User workouts after save:", user.workouts);
 
         // Fix: Fetch updated user from DB (prevents stale data issues)
         const updatedUser = await User.findOne({ emailId });
 
         // Fix: Calculate totals after ensuring updated data
         const totalRepetitions = updatedUser.workouts.reduce((sum, w) => sum + w.repetition, 0);
         const totalScore = updatedUser.workouts.reduce((sum, w) =>
             sum + (exercisePoints[w.nameWorkout] || 3) * w.repetition, 0
         );
 
         console.log("Total Repetitions:", totalRepetitions);
         console.log("Total Score:", totalScore);
 
         // Update leaderboard
         await Leaderboard.findOneAndUpdate(
             { emailId: updatedUser.emailId },
             { totalRepetitions, score: totalScore },
             { upsert: true, new: true }
         );
 
         res.send({ message: 'Workout added and leaderboard updated' });
     } catch (err) {
         console.error(err);
         res.status(500).send({ message: 'Error adding workout and updating leaderboard' });
     }
 });
 
 module.exports = router;
 
 

// Get all activities
router.get("/getallactivities", async (req, res) => {
    try {
        const activities = await Exercise.find({});
        res.send(activities);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

// Add a new activity
router.post("/addactivity", async (req, res) => {
    const { exerciseName, exerciseType } = req.body;

    const newExercise = new Exercise({ exerciseName, exerciseType });
    try {
        await newExercise.save();
        res.send('New Activity Added Successfully');
    } catch (error) {
        res.status(400).json({ error });
    }
});

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const mongoose = require("mongoose");
// const Exercise = require('../models/ExerciseSchema');

// const config = require('config');
// const User = require('../models/UserSchema');
// // Adding a Exercise




// // Fetch all Exercises

// router.post("/getAllExercises", async(req, res) => {
//      console.log(req.body.userId);
     
//      try {
//           const user = await User.findOne({ emailId: req.body.userId });
//           if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//           }
//           const workouts = user.workouts;
//           return res.status(200).json(workouts);
//      } catch (error) {
//           return res.status(400).json({ message: error });
//      }
// });


// // Fetch a particular type of Exercise




// router.post("/getactivitybyid", async(req, res) => {
//      console.log(req.body.exid);
     
//      try {
//           const room = await Exercise.findOne({'_id' : req.body.exid})
//           res.send(room)
//      } catch (error) {
//           return res.status(400).json({ message: error });
//      }
// });

// router.post("/scores", async(req, res) => {
//      try {
//           // Find the user by ID
//           workoutData = req.body.newScore;
//           console.log(workoutData);
//           const {emailId} = req.body;
//           console.log(emailId);
//           const user = await User.findOne({ emailId });
      
//           if (!user) {
//             return res.status(404).send({ message: 'User not found' });
//           }
      
//           // Add the new workout data to the user's workouts list
//           user.workouts.push(workoutData);
      
//           // Save the updated user document
//           await user.save();
      
//           res.send({ message: 'Workout added to user' });
//         } catch (err) {
//           console.error(err);
//           res.status(500).send({ message: 'Error adding workout to user' });
//         }
// });

// router.get("/getallactivities", async(req, res) => {
//     console.log(req.body);
//     try {
//          const act = await Exercise.find({})
//          res.send(act)
//     } catch (error) {
//          return res.status(400).json({ message: error });
//     }
// });

// router.post("/addactivity", async(req, res) => {
    
//  const { exerciseName, exerciseType } = req.body

//     const nex = new Exercise({
         
//         exerciseName, 
//         exerciseType
//     })
//     try {
//          await nex.save()
//          res.send('New Activity Added Successfully')
//     } catch (error) {
//          return res.status(400).json({ error });
//     }
// });

// module.exports = router;