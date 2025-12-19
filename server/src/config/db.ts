import mongoose from 'mongoose';

export default  async function  DB ():Promise<void>{

  try {
      const connction = await mongoose.connect(process.env.MONGODB_URI as string);

      console.log('DB connected')
  } catch (error) {
    
    console.error("ERROR : Something whent Wronge while connecting to Database")
  }



}