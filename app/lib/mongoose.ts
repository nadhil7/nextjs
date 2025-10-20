import mongoose from "mongoose";


const mongourl = process.env.mongo_url

const connection = async () => {
    await mongoose.connect(mongourl)
}