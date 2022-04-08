import { TestResult } from "../../../domain/model";
import { CreateTestResultDto, ListTestResultResponseDto } from "../../dto";

export default interface ITestResultRepository {
  getAll(size: number, page: number, filter?: Partial<TestResult>): Promise<ListTestResultResponseDto>;
  getOne(filter?: Partial<TestResult>): Promise<TestResult>;
  getOneById(id: string): Promise<TestResult>;
  create(createTestResultDto: CreateTestResultDto): Promise<TestResult>;
  delete(id: string): Promise<void>;
}