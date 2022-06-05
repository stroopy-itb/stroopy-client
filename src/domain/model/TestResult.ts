import {
  BaseModel,
  BodyCondition,
  KSS,
  RoomCondition,
  RoomLighting,
  RoomNoise,
  RoomTemperature,
  RoomVibration,
  ActivityBurden,
  Research,
  User,
} from ".";

export default interface TestResult extends BaseModel {
  bodyCondition: BodyCondition;
  roomCondition: RoomCondition;
  roomTemperature: number;
  roomTemperaturePerception: RoomTemperature;
  roomLighting: RoomLighting;
  roomNoise: RoomNoise;
  roomVibration: RoomVibration;
  kss: KSS;
  preActivity: string;
  preActivityPhysicalBurden: number;
  preActivityPhysicalBurdenWeight: ActivityBurden;
  preActivityPhysicalBurdenFreq: ActivityBurden;
  preActivityMentalBurden: number;
  preActivityMentalBurdenWeight: ActivityBurden;
  preActivityMentalBurdenFreq: ActivityBurden;
  postActivity: string;
  postActivityPhysicalBurden: number;
  postActivityPhysicalBurdenWeight: ActivityBurden;
  postActivityPhysicalBurdenFreq: ActivityBurden;
  postActivityMentalBurden: number;
  postActivityMentalBurdenWeight: ActivityBurden;
  postActivityMentalBurdenFreq: ActivityBurden;
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