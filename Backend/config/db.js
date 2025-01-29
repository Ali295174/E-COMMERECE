import mongoose  from "mongoose";

const ConnectDb= async()=>{
try {
   const con = await mongoose.connect(`${process.env.DB_URL}`)
    console.log(`connected to mongodb ${con.connection.host}`);
} catch (error) {
    console.log(`Error in mongodb ${error}`)
}
}
export default ConnectDb;

