import dotenv from "dotenv";

dotenv.config();

if(!process.env.MONGO_URI){
    console.error("MONGO_URI is not defined in environment variables");
    process.exit(1); // Stop the application if MONGO_URI is not defined
}

const config = {
    MONGO_URI: process.env.MONGO_URI  ,
    JWT_SECRET: process.env.JWT_SECRET  ,
    PORT: process.env.PORT || 5000

}

export default config;