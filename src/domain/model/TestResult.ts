import { BaseModel, BodyCondition, DeviceType, RoomCondition, ActivityBurden, Research, User } from ".";
import { RoomTemperature } from "./RoomTemperature";

export default interface TestResult extends BaseModel {
  bodyCondition: BodyCondition;
  device: DeviceType;
  roomCondition: RoomCondition;
  roomTemperature: RoomTemperature;
  preActivity: string;
  preActivityPhysicalBurden: ActivityBurden;
  preActivityMentalBurden: ActivityBurden;
  postActivity: string;
  postActivityPhysicalBurden: ActivityBurden;
  postActivityMentalBurden: ActivityBurden;
  testNo: number;
  correct: number;
  wrong: number;
  unanswered: number;
  rtca: number;
  respondentId: string;
  researchId: string;
  respondent?: User;
  research?: Research;
}