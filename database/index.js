const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://theboysamm:GqmdLwTwYv4O89PS@cluster0.6ysqy.mongodb.net/gitpractice?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
