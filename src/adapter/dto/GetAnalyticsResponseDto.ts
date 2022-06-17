import { Gender } from "../../domain/model";

export default class GetAnalyticsResponseDto {
  public readonly recordCount: number;
  public readonly daysRecorded: number;
  public dailyRecordCount: number;
  public readonly respondentCount: number;
  public readonly avgRtca: number;
  public readonly latestRecord?: Date | string;
  public readonly genderRtca: {
    id: Gender,
    recordCount: number;
    respondentCount: number;
    avgRtca: number;
  }[];
  public readonly ageRtca: {
    id: string;
    recordCount: number;
    respondentCount: number;
    avgRtca: number;
  }[];
}