import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import userRouter from './UserRoutes';

import { setServers } from 'node:dns';
setServers(['1.1.1.1', '8.8.8.8']);

export const app = express();
app.use(cors());
app.use(express.json());


app.use(express.static(path.resolve(__dirname, '../public')));

app.use("/api", userRouter);

// Only connect and listen when run directly, not when imported by tests
if (require.main === module) {
  mongoose.connect("mongodb+srv://sthananarin_db_user:MC3sE1LJQ1PKdshy@cluster-cloud-deploy.clgpt1j.mongodb.net/")
    .then(() => {
      console.log("Connected to MongoDB");
      app.listen(3000, () => {
        console.log("Server is running on http://localhost:3000");
      });
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
}
