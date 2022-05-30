import { CreateTestResultDto, GetAnalyticsResponseDto, ListTestResultResponseDto } from "../../../adapter/dto";
import { TestResult } from "../../model";

export default interface ITestResultService {
  getAll(size: number, page: number, filter?: Partial<TestResult>): Promise<ListTestResultResponseDto>;
  getAnalytics(researchId: string): Promise<GetAnalyticsResponseDto>;
  getOne(filter?: Partial<TestResult>): Promise<TestResult>;
  getOneById(id: string): Promise<TestResult>;
  create(createTestResultDto: CreateTestResultDto): Promise<TestResult>;
  delete(id: string): Promise<void>;
}