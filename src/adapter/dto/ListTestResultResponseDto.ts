import { TestResult } from "../../domain/model";
import { BaseListResponseDto } from "./BaseListResponseDto";

export default class TestResultListResponseDto extends BaseListResponseDto {
  testResults: TestResult[];
}