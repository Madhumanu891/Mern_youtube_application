import mongoose from "mongoose"


const connectBD=async()=>{
     try {

        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`)
     } catch (error) {
        console.log("Mongodb Connection Error",error)
        process.exit(1) // Reference to terminate the process with failure in the mogodb connect error . build in process with diffrerent status code
     }
}

export default connectBD
