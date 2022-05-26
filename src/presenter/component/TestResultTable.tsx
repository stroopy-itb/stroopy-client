import React from "react";
import { TestResult } from "../../domain/model";
import {
  countAge,
  translateActivityBurden,
  translateBodyCondition,
  translateGender,
  translateRoomCondition,
  translateRoomLighting,
  translateRoomNoise,
  translateRoomTemperature,
  translateRoomVibration,
} from "../utils";
import ExportSpreadsheet from "./ExportSpreadsheet";
import Paginate from "./Paginate";

export default function TestResultTable(props: {
  testResults?: TestResult[];
  size: number;
  page: number;
  totalSize: number;
  changePage?: (event: any) => void;
}): JSX.Element {
  const { testResults, size, page, totalSize, changePage } = props;

  return (
    <div className="justify-self-stretch overflow-hidden">
      <div className="flex justify-between mb-5">
        {testResults && testResults.length > 0 ? (
          <ExportSpreadsheet data={testResults} />
        ) : (
          ""
        )}
        <Paginate
          size={size}
          page={page}
          totalSize={totalSize}
          changePage={changePage}
        />
      </div>
      <div className="bg-gray-100 rounded-2xl overflow-auto md:p-5">
        {testResults ? (
          <table className="table-auto w-full">
            <thead>
              <tr className="font-bold">
                <td className="py-2 px-5 border-b-2 border-black">NO.</td>
                <td className="py-2 px-5 border-b-2 border-black">
                  Penelitian
                </td>
                <td className="py-2 px-5 border-b-2 border-black">Responden</td>
                <td className="py-2 px-5 border-b-2 border-black">Umur</td>
                <td className="py-2 px-5 border-b-2 border-black">Suku</td>
                <td className="py-2 px-5 border-b-2 border-black">Gender</td>
                <td className="py-2 px-5 border-b-2 border-black">Pekerjaan</td>
                <td className="py-2 px-5 border-b-2 border-black">Institusi</td>
                <td className="py-2 px-5 border-b-2 border-black">Divisi/Fakultas</td>
                <td className="py-2 px-5 border-b-2 border-black">Bagian/Studi</td>
                <td className="py-2 px-5 border-b-2 border-black">Tes Ke</td>
                <td className="py-2 px-5 border-b-2 border-black">Waktu Tes</td>
                <td className="py-2 px-5 border-b-2 border-black">
                  Tempat Tes
                </td>
                <td className="py-2 px-5 border-b-2 border-black">
                  Suhu Ruangan
                </td>
                <td className="py-2 px-5 border-b-2 border-black">
                  Persepsi Suhu Ruangan
                </td>
                <td className="py-2 px-5 border-b-2 border-black">
                  Pencahayaan Ruangan
                </td>
                <td className="py-2 px-5 border-b-2 border-black">
                  Kebisingan Ruangan
                </td>
                <td className="py-2 px-5 border-b-2 border-black">
                  Getaran Ruangan
                </td>
                <td className="py-2 px-5 border-b-2 border-black">
                  Kondisi Tubuh
                </td>
                <td className="py-2 px-5 border-b-2 border-black">
                  Aktivitas Sebelum
                </td>
                <td className="py-2 px-5 border-b-2 border-black">
                  Beban Fisik
                </td>
                <td className="py-2 px-5 border-b-2 border-black">
                  Beban Mental
                </td>
                <td className="py-2 px-5 border-b-2 border-black">
                  Aktivitas Sesudah
                </td>
                <td className="py-2 px-5 border-b-2 border-black">
                  Beban Fisik
                </td>
                <td className="py-2 px-5 border-b-2 border-black">
                  Beban Mental
                </td>
                <td className="py-2 px-5 border-b-2 border-black">Benar</td>
                <td className="py-2 px-5 border-b-2 border-black">Salah</td>
                <td className="py-2 px-5 border-b-2 border-black">RTCA</td>
              </tr>
            </thead>
            <tbody>
              {testResults.map((row, index) => {
                return (
                  <tr key={index}>
                    <td className="py-2 px-5">{index + 1}</td>
                    <td className="py-2 px-5">{row.research?.groupToken}</td>
                    <td className="py-2 px-5">{row.respondent?.profile?.name}</td>
                    <td className="py-2 px-5">{countAge(row.respondent?.profile?.dateOfBirth)}</td>
                    <td className="py-2 px-5">{row.respondent?.profile?.ethnicGroup}</td>
                    <td className="py-2 px-5">{translateGender(row.respondent?.profile?.gender)}</td>
                    <td className="py-2 px-5">{row.respondent?.profile?.job}</td>
                    <td className="py-2 px-5">{row.respondent?.profile?.institution}</td>
                    <td className="py-2 px-5">{row.respondent?.profile?.faculty}</td>
                    <td className="py-2 px-5">{row.respondent?.profile?.study}</td>
                    <td className="py-2 px-5">{row.testNo}</td>
                    <td className="py-2 px-5">
                      {new Date(row.createdAt).toLocaleString()}
                    </td>
                    <td className="py-2 px-5">
                      {translateRoomCondition(row.roomCondition)}
                    </td>
                    <td className="py-2 px-5">{row.roomTemperature}</td>
                    <td className="py-2 px-5">{translateRoomTemperature(row.roomTemperaturePerception)}</td>
                    <td className="py-2 px-5">{translateRoomLighting(row.roomLighting)}</td>
                    <td className="py-2 px-5">{translateRoomNoise(row.roomNoise)}</td>
                    <td className="py-2 px-5">{translateRoomVibration(row.roomVibration)}</td>
                    <td className="py-2 px-5">
                      {translateBodyCondition(row.bodyCondition)}
                    </td>
                    <td className="py-2 px-5">{row.preActivity}</td>
                    <td className="py-2 px-5">
                      {translateActivityBurden(row.preActivityPhysicalBurden)}
                    </td>
                    <td className="py-2 px-5">
                      {translateActivityBurden(row.preActivityMentalBurden)}
                    </td>
                    <td className="py-2 px-5">{row.postActivity}</td>
                    <td className="py-2 px-5">
                      {translateActivityBurden(row.postActivityPhysicalBurden)}
                    </td>
                    <td className="py-2 px-5">
                      {translateActivityBurden(row.postActivityMentalBurden)}
                    </td>
                    <td className="py-2 px-5">{row.correct}</td>
                    <td className="py-2 px-5">{row.wrong}</td>
                    <td className="py-2 px-5">{row.rtca}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
