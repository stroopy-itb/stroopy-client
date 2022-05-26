import { BaseModel, BodyCondition, RoomCondition, ActivityBurden, Research, User } from ".";
import { RoomLighting } from "./RoomLighting";
import { RoomNoise } from "./RoomNoise";
import { RoomTemperature } from "./RoomTemperature";
import { RoomVibration } from "./RoomVibration";

export default interface TestResult extends BaseModel {
  bodyCondition: BodyCondition;
  roomCondition: RoomCondition;
  roomTemperature: number;
  roomTemperaturePerception: RoomTemperature;
  roomLighting: RoomLighting;
  roomNoise: RoomNoise;
  roomVibration: RoomVibration;
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