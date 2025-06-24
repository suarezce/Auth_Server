
import mongoose from 'mongoose';

export const connectDB = async () => {
    try {

        await mongoose.connect(process.env.MONGO_AUTH_URI);

        console.log(`✅ Connected to MongoDB on ${process.env.MONGO_AUTH_URI}`);

    } catch (err) {
        console.error(err);
    }
}

