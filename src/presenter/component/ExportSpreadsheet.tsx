import React, { useCallback } from "react";
import { Research, TestResult } from "../../domain/model";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import {
  countAge,
  translateActivityBurden,
  translateBodyCondition,
  translateGender,
  translateKSS,
  translateRoomCondition,
  translateRoomLighting,
  translateRoomNoise,
  translateRoomTemperature,
  translateRoomVibration,
} from "../utils";
import di from "../di";

export default function ExportSpreadsheet(props: {
  research?: Research;
  filename?: string;
}) {
  const { research, filename } = props;

  const exportFilename = filename ? filename : "stroopy_hasil_tes";
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const getTestResult = useCallback(async () => {
    if (research) {
      return await di.service.testResultService.getAll(0, 1, {
        researchId: research.id,
      });
    }
  }, [research]);

  const flattenData = (input: TestResult[]) => {
    const flatData: any = input.map((entry) => {
      return {
        id: entry.id,
        penelitian: entry.research?.groupToken,
        responden: entry.respondent?.profile?.name,
        umur: countAge(entry.respondent?.profile?.dateOfBirth),
        gender: translateGender(entry.respondent?.profile?.gender),
        suku: entry.respondent?.profile?.ethnicGroup,
        pekerjaan: entry.respondent?.profile?.job,
        institusi: entry.respondent?.profile?.institution,
        bagian: entry.respondent?.profile?.faculty,
        divisi: entry.respondent?.profile?.study,
        tes_ke: entry.testNo,
        waktu_tes: entry.createdAt,
        kondisi_ruangan: translateRoomCondition(entry.roomCondition),
        suhu_ruangan: entry.roomTemperature,
        persepsi_suhu_ruangan: translateRoomTemperature(
          entry.roomTemperaturePerception
        ),
        pencahayaan_ruangan: translateRoomLighting(entry.roomLighting),
        kebisingan_ruangan: translateRoomNoise(entry.roomNoise),
        getaran_ruangan: translateRoomVibration(entry.roomVibration),
        kondisi_tubuh: translateBodyCondition(entry.bodyCondition),
        kss: translateKSS(entry.kss),
        aktivitas_sebelum: entry.preActivity,
        beban_fisik_aktivitas_sebelum: entry.preActivityPhysicalBurden,
        beban_mental_aktivitas_sebelum: entry.preActivityMentalBurden,
        aktivitas_sesudah: entry.postActivity,
        beban_fisik_aktivitas_sesudah: entry.postActivityPhysicalBurden,
        beban_mental_aktivitas_sesudah: entry.postActivityMentalBurden,
        benar: entry.correct,
        salah: entry.wrong,
        rtca: entry.rtca,
      };
    });
    return flatData;
  };
  const exportSpreadSheet = async () => {
    const data = await getTestResult();

    if (data?.testResults) {
      const ws = XLSX.utils.json_to_sheet(flattenData(data.testResults));
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const fileData = new Blob([excelBuffer], { type: fileType });

      const dateNow = new Date();
      const leadingZero = (n: number) => {
        return n < 10 ? `0${n}` : n;
      };
      const dateString = `${dateNow.getFullYear()}_${leadingZero(
        dateNow.getMonth() + 1
      )}_${leadingZero(dateNow.getDate())}`;
      FileSaver.saveAs(
        fileData,
        `${exportFilename}-${dateString}${fileExtension}`
      );
    }
  };

  return (
    <button
      className="button button-md button-blue"
      onClick={exportSpreadSheet}
    >
      Unduh Spreadsheet
    </button>
  );
}
