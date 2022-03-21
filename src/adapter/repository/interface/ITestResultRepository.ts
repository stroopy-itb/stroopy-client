import { TestResult } from "../../../domain/model";
import { CreateTestResultDto } from "../../dto";

export default interface ITestResultRepository {
  getAll(filter?: Partial<TestResult>): Promise<TestResult[]>;
  getOne(filter?: Partial<TestResult>): Promise<TestResult>;
  getOneById(id: string): Promise<TestResult>;
  create(createTestResultDto: CreateTestResultDto): Promise<TestResult>;
  delete(id: string): Promise<void>;
}