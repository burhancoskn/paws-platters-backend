import express from "express";
import "dotenv/config";
import client from './db/db.js';
import cors from "cors";
import shopRouter from './router/shopRouter.js';
import authRouter from './router/authRouter.js';
import adaptRouter from './router/adaptRouter.js';

const app = express();

app.use(express.json());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials"],
  credentials: true,
}));

app.use("/shop", shopRouter);
app.use("/auth", authRouter); 
app.use("/adapt", adaptRouter); 

const port = process.env.PORT || 3000;

client.on("connected", () => {  
  console.log("Connected to MongoDB");

  app.listen(port, () => {
    console.log(`Server listening to ${port}`);
  });

  app.listen(80, () => {
    console.log("CORS-enabled web server listening on port 80");
  });
});
