import { ActivityBurden, BodyCondition, DeviceType, RoomCondition } from "../../domain/model";

export default class CreateTestResultDto {
  public bodyCondition: BodyCondition;
  public bodyTemp: number;
  public device: DeviceType;
  public roomCondition: RoomCondition;
  public preActivity: string;
  public preActivityPhysicalBurden: ActivityBurden;
  public preActivityMentalBurden: ActivityBurden;
  public postActivity: string;
  public postActivityPhysicalBurden: ActivityBurden;
  public postActivityMentalBurden: ActivityBurden;
  public testNo: number;
  public correct: number;
  public wrong: number;
  public unanswered: number;
  public rtca: number;
  public respondentId: string;
  public researchId: string;
}
