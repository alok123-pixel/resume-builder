import imageKit from "../configs/imagekit.js";
import Resume from "../models/Resume.model.js";
import fs from 'fs';




// controller for creating a new resume
// POST: /api/resumes/create
export const createResume = async(req,res)=>{
   try {
      const userId = req.userId;
      const {title} = req.body;

      // create new resume
      const newResume = await Resume.create({userId,title})
      // return success message
      return res.status(201).json({message: 'Resume created successfully',
        resume: newResume
      })
   } catch (error) {
      return res.status(400).json({message: error.message})
   }
}

// controller for deleting the resume
// DELETE: /api/resume/delete

export const deleteResume = async(req,res)=>{
    try {
       const userId = req.userId;
       const {resumeId} = req.params;

       await Resume.findOneAndDelete({userId, _id: resumeId})

       // return success message
        return res.status(200).json({message: 'Resume deleted successfully'})
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}

// get user resume by id
// GET: /api/resume/get

export const getResumeById = async(req,res)=>{
      try {
         const userId = req.userId;
         const {resumeId} = req.params;

        const resume = await Resume.findOne({userId, _id: resumeId})

        if(!resume){
            return res.status(404).json({message: 'Resume not found'})
        }

        // return success message
        resume._v = undefined;
        resume.createdAt = undefined;
        resume.updatedAt = undefined;

        return res.status(200).json({resume})
      } catch (error) {
           return res.status(400).json({message:error.message})
      }
}


// get resume by id public
// GET: /api/resume/public

export const getPublicResumeById = async(req,res)=>{
     try {
        const {resumeId} = req.params;
        const resume = await Resume.findOne({public: true, _id:resumeId})

        if(!resume){
            return res.status(404).json({message: 'Resume not found'})
        }

        return res.status(200).json({resume});
     } catch (error) {
        return res.status(400).json({message:error.message})
     }
}

// controller for updating a resume
// PUT: /api/resumes/update

export const updateResume = async(req,res)=>{
    try {
        const userId = req.userId;
        const {resumeId, resumeData, removeBackground} = req.body
        const image = req.file;

        if(!resumeId || !resumeData){
            return res.status(400).json({message: 'resumeId and resumeData are required'})
        }

        const resumeDataCopy = typeof resumeData === 'string'
            ? JSON.parse(resumeData)
            : structuredClone(resumeData)

        if(!resumeDataCopy || typeof resumeDataCopy !== 'object' || Array.isArray(resumeDataCopy)){
            return res.status(400).json({message: 'resumeData must be an object'})
        }

        delete resumeDataCopy._id
        delete resumeDataCopy.userId
        delete resumeDataCopy.createdAt
        delete resumeDataCopy.updatedAt

        if(image){
            if(!resumeDataCopy.personal_info || typeof resumeDataCopy.personal_info !== 'object'){
                return res.status(400).json({message: 'personal_info is required when uploading an image'})
            }

            const imageBufferData = fs.createReadStream(image.path)
            const response = await imageKit.files.upload({
                file: imageBufferData,
                fileName: 'resume.png',
                folder: 'user-resume',
                transformation:{
                    pre: 'w-300, h-300, fo-face, z-0.75' + (removeBackground ? 'e-bgremove' : '')
                }
            });
            resumeDataCopy.personal_info.image = response.url
        }

        const resume = await Resume.findOneAndUpdate(
            {userId, _id: resumeId},
            {$set: resumeDataCopy},
            {new: true, runValidators: true}
        )

        if(!resume){
            return res.status(404).json({message: 'Resume not found'})
        }

        return res.status(200).json({message: 'Saved successfully', resume})
    } catch (error) {
        console.error('Error updating resume:', error)
        const status = error instanceof SyntaxError || error.name === 'CastError' || error.name === 'ValidationError'
            ? 400
            : 500
        return res.status(status).json({message:error.message})
    }
}

// 9:28:36

