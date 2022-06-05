import { ActivityBurden, BodyCondition, Gender, InstitutionType, KSS, RoomCondition, RoomLighting, RoomNoise, RoomTemperature, RoomVibration } from "../../domain/model";

export const translateBodyCondition = (cond: BodyCondition): string => {
  switch (cond) {
    case BodyCondition.Healthy:
      return "Sehat";
    case BodyCondition.NotHealthy:
      return "Tidak sehat";
  }
}

export const translateKSS = (cond: KSS): string => {
  switch (cond) {
    case KSS.ExtremelyAlert:
      return "Sangat-sangat Waspada";
    case KSS.VeryAlert:
      return "Sangat Waspada";
    case KSS.Alert:
      return "Waspada";
    case KSS.RatherAlert:
      return "Sedikit Waspada";
    case KSS.Neutral:
      return "Netral";
    case KSS.RatherSleepy:
      return "Sedikit Mengantuk";
    case KSS.Sleepy:
      return "Mengantuk";
    case KSS.VerySleepy:
      return "Sangat Mengantuk";
    case KSS.ExtremelySleepy:
      return "Sangat-sangat Mengantuk";
  }
}


export const translateRoomCondition = (room: RoomCondition): string => {
  switch (room) {
    case RoomCondition.Indoor:
      return "Dalam ruangan";
    case RoomCondition.Outdoor:
      return "Luar ruangan";
  }
}

export const translateRoomTemperature = (roomTemp: RoomTemperature | undefined): string => {
  if (!roomTemp) return "";

  switch (roomTemp) {
    case RoomTemperature.Hot:
      return "Panas";
    case RoomTemperature.Normal:
      return "Normal";
    case RoomTemperature.Cold:
      return "Dingin";
  }
}

export const translateRoomLighting = (roomLight: RoomLighting | undefined): string => {
  if (!roomLight) return "";

  switch (roomLight) {
    case RoomLighting.Bright:
      return "Terang";
    case RoomLighting.Normal:
      return "Normal";
    case RoomLighting.Dark:
      return "Gelap";
  }
}

export const translateRoomNoise = (roomNoise: RoomNoise | undefined): string => {
  if (!roomNoise) return "";

  switch (roomNoise) {
    case RoomNoise.Noisy:
      return "Berisik";
    case RoomNoise.Normal:
      return "Normal";
    case RoomNoise.Quiet:
      return "Sunyi";
  }
}

export const translateRoomVibration = (roomVibe: RoomVibration | undefined): string => {
  if (!roomVibe) return "";

  switch (roomVibe) {
    case RoomVibration.None:
      return "Tidak Ada";
    case RoomVibration.Weak:
      return "Kecil";
    case RoomVibration.Strong:
      return "Besar";
  }
}

export const translateActivityBurden = (burden: ActivityBurden): string => {
  switch (burden) {
    case ActivityBurden.Heavy:
      return "Berat";
    case ActivityBurden.Medium:
      return "Sedang";
    case ActivityBurden.Light:
      return "Ringan";
  }
}

export const translateActivityBurdenToNumber = (burden?: ActivityBurden): number => {
  if (!burden) return 0;

  switch (burden) {
    case ActivityBurden.Heavy:
      return 100;
    case ActivityBurden.Medium:
      return 50;
    case ActivityBurden.Light:
      return 0;
  }
}

export const translateInstitutionType = (type: InstitutionType | undefined): string => {
  if (!type) {
    return "";
  }

  switch (type) {
    case InstitutionType.GENERAL:
      return "Umum";
    case InstitutionType.UNIVERSITY:
      return "Universitas";
  }
}

export const translateGender = (type: Gender | undefined): string => {
  if (!type) {
    return "";
  }

  switch (type) {
    case Gender.Male:
      return "Pria";
    case Gender.Female:
      return "Wanita";
  }
}

export const countAge = (dob: Date | string | undefined): number => {
  if (!dob) return 0;

  const today = Date.now();
  const birthDate = new Date(dob).valueOf();

  return Math.floor((today - birthDate) / (31556952000));
};

export const translateAgeGroup = (id: string): string => {
  switch (id) {
    case "child":
      return "< 12";
    case "youth":
      return "13 - 24"
    case "adult":
      return "25 - 40"
    case "lateAdult":
      return "40 - 50"
    case "senior":
      return "> 50"
    default:
      return id;
  }
}
