import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Job } from "../models/job.model";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Job],
  synchronize: true, // Use only in development
  logging: true,
});
