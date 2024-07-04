import { Router } from "express";
import {
  createJob,
  getJob,
  updateJob,
  deleteJob,
  listJobs,
} from "../controllers/job.controller";

const router = Router();

router.post("/jobs", createJob);
router.get("/jobs/:id", getJob);
router.put("/jobs/:id", updateJob);
router.delete("/jobs/:id", deleteJob);
router.get("/jobs", listJobs);

export default router;
