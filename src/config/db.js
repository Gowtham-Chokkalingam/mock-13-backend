const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const MONGO_URI = `mongodb+srv://g:g@cluster0.joheuia.mongodb.net/mock-13?retryWrites=true&w=majority`;
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected:${conn.connection.host}`);
  } catch (error) {
    console.log("error:", error.message);
    process.exit();
  }
};

module.exports = connectDB;
