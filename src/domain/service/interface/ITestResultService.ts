import { CreateTestResultDto } from "../../../adapter/dto";
import { TestResult } from "../../model";

export default interface ITestResultService {
  getAll(filter?: Partial<TestResult>): Promise<TestResult[]>;
  getOne(filter?: Partial<TestResult>): Promise<TestResult>;
  getOneById(id: string): Promise<TestResult>;
  create(createTestResultDto: CreateTestResultDto): Promise<TestResult>;
  delete(id: string): Promise<void>;
}