const express = require('express');
const router = express.Router();
const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/eventController');
const { verifyToken, adminOnly } = require('../middleware/authMiddleware');

//  Public to logged-in users (admin + user) 
router.get('/', verifyToken, getAllEvents);
router.get('/:id', verifyToken, getEventById);

//  Admin only routes 
router.post('/', verifyToken, adminOnly, createEvent);
router.put('/:id', verifyToken, adminOnly, updateEvent);
router.delete('/:id', verifyToken, adminOnly, deleteEvent);

module.exports = router;