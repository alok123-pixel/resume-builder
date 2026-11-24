import mongoose from "mongoose";

const connetDB = async()=>{
    mongoose.connection.on('connected', ()=>{
        console.log('Database connected')
    })

    let mongodbURI = process.env.MONGODB_URI;
    const projectName = 'Resume';

    if(!mongodbURI){
        throw new Error('MONGODB_URI environment variable not set')
    }

    if(mongodbURI.endsWith('/')){
        mongodbURI = mongodbURI.slice(0, -1)
    }

    await mongoose.connect(`${mongodbURI}/${projectName}`) 
}

export default connetDB;