import { TestResult } from "../../domain/model";
import { CreateTestResultDto } from "../dto";
import { HttpClient } from "../infrastructure";
import { ITestResultRepository } from "./interface";

export default class TestResultRepository implements ITestResultRepository {
  constructor(
    private readonly http: HttpClient
  ) { }

  getAll(filter?: Partial<TestResult>): Promise<TestResult[]> {
    let query: string = "";
    if (filter) {
      let i = 0;
      Object.entries(filter).forEach((item) => {
        if (item[1]) {
          const string = ((i === 0) ? `?${item[0]}=${item[1]}` : `&${item[0]}=${item[1]}`);
          query = `${query}${string}`;
          i++;
        }
      });
    }

    return this.http.get(`test-result/list${query}`);
  }
  getOne(filter?: Partial<TestResult>): Promise<TestResult> {
    let query: string = "";
    if (filter) {
      let i = 0;
      Object.entries(filter).forEach((item) => {
        if (item[1]) {
          const string = ((i === 0) ? `?${item[0]}=${item[1]}` : `&${item[0]}=${item[1]}`);
          query = `${query}${string}`;
          i++;
        }
      });
    }

    return this.http.get(`test-result${query}`);
  }
  getOneById(id: string): Promise<TestResult> {
    return this.http.get(`test-result/${id}`);
  }
  create(createTestResultDto: CreateTestResultDto): Promise<TestResult> {
    return this.http.post(`test-result/create`, createTestResultDto);
  }
  delete(id: string): Promise<void> {
    return this.http.delete(`test-result/delete/${id}`);
  }
}