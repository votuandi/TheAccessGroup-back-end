import { AppDataSource } from "../utils/data-source";
import { Job } from "../models/job.model";

export class JobService {
  private jobRepository = AppDataSource.getRepository(Job);

  public async createJob(data: Partial<Job>): Promise<Job | null> {
    try {
      const job = this.jobRepository.create(data);
      return await this.jobRepository.save(job);
    } catch (error) {
      return null;
    }
  }

  public async getJob(id: number): Promise<Job | null> {
    try {
      return await this.jobRepository.findOne({ where: { id } });
    } catch (error) {
      return null;
    }
  }

  public async updateJob(id: number, data: Partial<Job>): Promise<Job | null> {
    try {
      await this.jobRepository.update(id, data);
      return this.getJob(id);
    } catch (error) {
      return null;
    }
  }

  public async deleteJob(id: number): Promise<number | null | undefined> {
    try {
      let result = await this.jobRepository.delete(id);
      return result.affected;
    } catch (error) {
      return null;
    }
  }

  public async listJobs(
    page: number,
    size: number
  ): Promise<[Job[], number] | null> {
    try {
      const [result, total] = await this.jobRepository.findAndCount({
        skip: (page - 1) * size,
        take: size,
      });
      return [result, total];
    } catch (error) {
      return null;
    }
  }
}
