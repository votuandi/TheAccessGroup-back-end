import express from "express";
import bodyParser from "body-parser";
import jobRoutes from "./routes/job.route";
import cors from "cors";
import { AppDataSource } from "./utils/data-source";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api", jobRoutes);

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");

    const port = process.env.PORT || 4200;

    app.listen(port, () => {
      console.log(`Server is running on port`, port);
    });
  } catch (error) {
    console.error("Error during Data Source initialization:", error);
  }
};

startServer();
