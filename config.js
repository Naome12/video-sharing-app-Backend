import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connection = async ()=>{
    try {
        mongoose.connect(process.env.URI,{
            useNewURLParser: true,
            useUnifiedTopology: true,
        }).then(()=>console.log(`db connected`))
            
        
    }catch (error) {
        console.log(error)
        process.exit()
    }
}

export default connection