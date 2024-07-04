import { Request, Response } from "express";
import { JobService } from "../services/job.service";
import { StatusCodes } from "http-status-codes";

const jobService = new JobService();

type GetJobsPayload = {
  number?: string;
  size?: string;
};

export const createJob = async (req: Request, res: Response) => {
  const job = await jobService.createJob(
    req.body.params ? req.body.params : req.body
  );
  if (job) {
    res.status(201).json(job);
  } else res.status(StatusCodes.BAD_REQUEST).send();
};

export const getJob = async (req: Request, res: Response) => {
  const job = await jobService.getJob(Number(req.params.id));
  if (job) {
    res.json(job);
  } else {
    res.status(404).json({ message: "Job not found" });
  }
};

export const updateJob = async (req: Request, res: Response) => {
  const job = await jobService.updateJob(
    Number(req.params.id),
    req.body.params ? req.body.params : req.body
  );
  if (job) {
    res.status(204).json(job);
  } else {
    res.status(404).json({ message: "Job not found" });
  }
};

export const deleteJob = async (req: Request, res: Response) => {
  let result = await jobService.deleteJob(Number(req.params.id));
  if (!!result && result > 0) {
    res.status(204).send();
  } else res.status(StatusCodes.BAD_REQUEST).send();
};

export const listJobs = async (req: Request, res: Response) => {
  const page = req.query.page as GetJobsPayload;
  const pageNumber = page?.number ? Number(page.number) : 1;
  const pageSize = page?.size ? Number(page.size) : 5;

  const result = await jobService.listJobs(pageNumber, pageSize);
  if (!!result) {
    const [jobs, total] = result;
    res.status(200).json({ jobs, total });
  } else {
    res.status(StatusCodes.BAD_REQUEST).send();
  }
};
