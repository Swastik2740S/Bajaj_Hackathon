const express = require('express');
const router = express.Router();
const Leaderboard = require('../models/leaderboardSchema');

// GET leaderboard (sorted by score)
router.get('/', async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ score: -1 });
    res.json({ success: true, leaderboard });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error", error: err.message });
  }
});

// POST update leaderboard scores
router.post('/update', async (req, res) => {
  try {
    await Leaderboard.updateLeaderboard();
    res.json({ success: true, message: "Leaderboard updated successfully!" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update leaderboard", error: err.message });
  }
});

module.exports = router;
