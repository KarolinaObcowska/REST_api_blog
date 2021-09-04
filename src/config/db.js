const mongoose = require('mongoose');

const db = "mongodb+srv://Karolina:TFHsMAUhIsmvDYgW@blog.zoryr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


export const connectDB = async () => {
    try {
        await mongoose.connect(db, { 
            useUnifiedTopology: true,
            useNewUrlParser: true,
         });
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
};
