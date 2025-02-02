import { connect } from 'mongoose';

const MONGO_URL = "mongodb://127.0.0.1:27017/gigwork";

export const connectDB = async () => {
    try {
        await connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error(error);
    }
};

// export const collection = (name: string) => {
//     return model(name, new Schema({}), name);
// };