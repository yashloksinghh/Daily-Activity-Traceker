const express = require('express');
const router = express.Router();
const { generateTravelPlan } = require('../services/aiService');

router.post('/plan', async (req, res) => {
  try {
    const { destination, budget, startDate, endDate, travelers, preferences } = req.body;

    if (!destination || !budget || !startDate || !endDate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const budgetNum = parseFloat(budget);
    if (isNaN(budgetNum) || budgetNum <= 0) {
      return res.status(400).json({ error: 'Invalid budget amount' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

    if (days <= 0) {
      return res.status(400).json({ error: 'End date must be after start date' });
    }

    const travelPlan = await generateTravelPlan({
      destination,
      budget: budgetNum,
      days,
      travelers: parseInt(travelers) || 1,
      preferences: preferences || ''
    });

    res.json(travelPlan);
  } catch (error) {
    console.error('Error generating travel plan:', error);
    res.status(500).json({ error: 'Failed to generate travel plan' });
  }
});

module.exports = router;
