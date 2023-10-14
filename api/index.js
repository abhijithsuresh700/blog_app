import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import articleRoute from "./routes/articleRoute.js";
import categoryRoute from "./routes/categoryRoute.js";

const app = express();
dotenv.config();


//middlewares
app.use(express.json());
app.use(cors());

app.use("/api/article", articleRoute)
app.use("/api/category", categoryRoute)


app.get('/', async (req, res) => {
    res.status(200).send({
      message: 'Hello from smec blog!'
    })
  })

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("An error occured at the database connection");
    throw error;
  }
};

app.listen(4000, () => {
    connect();
  console.log("Server is running on port 4000");
});
