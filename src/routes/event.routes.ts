import express from 'express';
import { createEvent, getEvent, updateEvent, deleteEvent, getEvents } from '../controllers/event.controller';
import { authMiddleware } from '../middlewares/authMiddleware';
import { upload } from '../utils/upload';

const router = express.Router();

router.post('/events', authMiddleware, createEvent);
router.get('/events/:id', getEvent);
router.get('/events', getEvents);
router.put('/events/:id', authMiddleware, updateEvent);
router.delete('/events/:id', authMiddleware, deleteEvent);

export default router;
