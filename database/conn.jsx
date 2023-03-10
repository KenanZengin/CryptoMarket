import mongoose from "mongoose";

const connectMongo = async () => {

    mongoose.set('strictQuery', true);
    try{
        const {connection} = await mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true})

        if(connection.readyState==1){
            return Promise.resolve(true)
        }

    } catch (error) {
        return Promise.reject(error)
    }
}


export default connectMongo;
