import mongoose from "mongoose";

export async function connect() {
  try {
    
    await mongoose.connect(process.env.MONGO_URI! ); 

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected");
    }); 

    connection.on("error", (error) => {
      console.log("MongoDB connection error , please make sure DB is up and runnning : " + error);
      process.exit();
    });

  } catch (error) {
    console.log(" DB connection error");
  }
}
 


