import express from 'express'
import protect from '../middlewares/auth.middlware.js';
import { createResume, deleteResume, getPublicResumeById, getResumeById, updateResume } from '../controllers/resume.controller.js';
import upload from '../controllers/multer.controller.js';

const resumeRouter = express.Router();

resumeRouter.post('/create', protect, createResume);
resumeRouter.put('/update',upload.single('image'), protect, updateResume);
resumeRouter.delete('/delete/:resumeId', protect, deleteResume);
resumeRouter.get('/get/:resumeId', protect, getResumeById);
resumeRouter.get('/public/:resumeId', getPublicResumeById);

export default resumeRouter;