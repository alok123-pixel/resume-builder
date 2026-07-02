import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connetDB from './configs/db.js';
import userRouter from './routes/user.routes.js';
import resumeRouter from './routes/resume.routes.js';
import aiRouter from './routes/ai.routes.js';

const app = express();

const PORT = process.env.PORT || 3000;

await connetDB()

app.use(express.json())
app.use(cors())


app.get('/',(req,res)=>{
    res.send('Server is readyy');
})

app.use('/api/users', userRouter)
app.use('/api/resumes', resumeRouter)
app.use('/api/ai',aiRouter)

app.listen(PORT,()=>{
    console.log(`app is listening on ${PORT}`)
})


// 7:41:44




