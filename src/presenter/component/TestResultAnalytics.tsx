import React, { useCallback, useEffect, useState } from "react";
import { Gender, ResearchTicket, TestResult } from "../../domain/model";
import { Bar } from "react-chartjs-2";
import { ChartData } from "chart.js";
import { translateAgeGroup, translateGender } from "../utils";
import { GetAnalyticsResponseDto } from "../../adapter/dto";

export default function TestResultAnalytics(props: {
  analytics?: GetAnalyticsResponseDto;
  researchTickets?: ResearchTicket[];
  respondentTestResults?: TestResult[];
  onRespondentIdChange: (respondentId: string) => void;
}): JSX.Element {
  const {
    analytics,
    researchTickets,
    respondentTestResults,
    onRespondentIdChange,
  } = props;

  const genderRtcaData = useCallback(() => {
    let data: ChartData<"bar"> = {
      labels: Object.entries(Gender).map((entry) => translateGender(entry[1])),
      datasets: [
        {
          data: analytics?.genderRtca.map((entry) => entry.avgRtca) || [],
          backgroundColor,
          borderColor,
          borderWidth: 1,
          borderRadius: 5,
        },
      ],
    };

    return data;
  }, [analytics]);

  const ageRtcaData = useCallback(() => {
    let data: ChartData<"bar"> = {
      labels:
        analytics?.ageRtca.map((entry) => translateAgeGroup(entry.id)) || [],
      datasets: [
        {
          data: analytics?.ageRtca.map((entry) => entry.avgRtca) || [],
          backgroundColor,
          borderColor,
          borderWidth: 1,
          borderRadius: 5,
        },
      ],
    };

    return data;
  }, [analytics]);

  const [respondentId, setRespondentId] = useState("");
  useEffect(() => {
    onRespondentIdChange(respondentId);
  }, [respondentId, onRespondentIdChange]);

  const respondentChartData = useCallback(() => {
    let respondentRecords: { avgRtca: number; date: Date | string }[] = [];
    let newRecord = {
      count: 0,
      rtca: 0,
      lastDate: new Date("").toLocaleDateString(),
    };

    if (
      respondentTestResults &&
      respondentTestResults.length !== 0 &&
      respondentTestResults[0].respondentId === respondentId
    ) {
      respondentTestResults?.forEach((result) => {
        const resultDate = new Date(result.createdAt).toLocaleDateString();
        if (resultDate === newRecord.lastDate) {
          newRecord.count += 1;
          newRecord.rtca += result.rtca;
        } else {
          if (newRecord.count !== 0) {
            respondentRecords.push({
              avgRtca: newRecord.rtca / newRecord.count,
              date: newRecord.lastDate,
            });
          }

          newRecord = {
            count: 1,
            rtca: result.rtca,
            lastDate: resultDate,
          };
        }
      });

      if (newRecord.count !== 0) {
        respondentRecords.push({
          avgRtca: newRecord.rtca / newRecord.count,
          date: newRecord.lastDate,
        });
      }
    }

    let data: ChartData<"bar"> = {
      labels: respondentRecords?.map((record) => record.date),
      datasets: [
        {
          data: respondentRecords?.map((record) => record.avgRtca),
          backgroundColor,
          borderColor,
          borderWidth: 1,
          borderRadius: 5,
        },
      ],
    };

    return data;
  }, [respondentTestResults, respondentId]);

  return (
    <div className="justify-self-stretch overflow-hidden">
      <div className="grid gap-5 grid-cols-2 lg:grid-cols-3 mb-5">
        <div className="bg-gray-100 rounded-2xl p-3">
          <h2 className="texl-xl lg:text-2xl font-bold text-green">
            Jumlah Data
          </h2>
          <p className="texl-xl lg:text-2xl font-bold">
            {analytics?.recordCount}
          </p>
        </div>
        <div className="bg-gray-100 rounded-2xl p-3">
          <h2 className="texl-xl lg:text-2xl font-bold text-red">
            Jumlah Hari Pengukuran
          </h2>
          <p className="texl-xl lg:text-2xl font-bold">
            {analytics?.daysRecorded}
          </p>
        </div>
        <div className="bg-gray-100 rounded-2xl p-3">
          <h2 className="texl-xl lg:text-2xl font-bold text-blue">
            Jumlah Pengukuran per Hari
          </h2>
          <p className="texl-xl lg:text-2xl font-bold">
            {(analytics?.dailyRecordCount)}
          </p>
        </div>
        <div className="bg-gray-100 rounded-2xl p-3">
          <h2 className="texl-xl lg:text-2xl font-bold text-yellow">
            Jumlah Responden
          </h2>
          <p className="texl-xl lg:text-2xl font-bold">
            {analytics?.respondentCount}
          </p>
        </div>
        <div className="bg-gray-100 rounded-2xl p-3">
          <h2 className="texl-xl lg:text-2xl font-bold text-green">
            Rata-Rata RTCA
          </h2>
          <p className="texl-xl lg:text-2xl font-bold">{analytics?.avgRtca}</p>
        </div>
        <div className="bg-gray-100 rounded-2xl p-3">
          <h2 className="texl-xl lg:text-2xl font-bold text-red">
            Pengujian Terakhir
          </h2>
          <p className="texl-xl lg:text-2xl font-bold">
            {analytics?.latestRecord
              ? new Date(analytics?.latestRecord || "").toLocaleDateString()
              : ""}
          </p>
        </div>
      </div>
      <div className="grid gap-5 grid-cols-1 lg:grid-cols-3 justify-between">
        <div className="bg-gray-100 rounded-2xl p-3">
          <Bar
            data={genderRtcaData()}
            options={{
              plugins: {
                title: { display: true, text: "Gender VS RTCA" },
                legend: { display: false },
              },
              responsive: true,
            }}
          />
        </div>
        <div className="bg-gray-100 rounded-2xl p-3">
          <Bar
            data={ageRtcaData()}
            options={{
              plugins: {
                title: { display: true, text: "Umur VS RTCA" },
                legend: { display: false },
              },
              responsive: true,
            }}
          />
        </div>
        <div className="bg-gray-100 rounded-2xl p-3">
          <select
            className="form-control"
            value={respondentId}
            onChange={(event) => setRespondentId(event.currentTarget.value)}
          >
            <option value="">Pilih Responden</option>
            {researchTickets?.map((item) => (
              <option key={item.id} value={item.respondent?.id || ""}>
                {item.respondent?.profile?.name || item.respondent?.username}
              </option>
            ))}
          </select>
          <Bar
            data={respondentChartData()}
            options={{
              plugins: {
                title: { display: true, text: "Data Responden" },
                legend: { display: false },
              },
              responsive: true,
            }}
          />
        </div>
      </div>
    </div>
  );
}

const backgroundColor = [
  "rgba(255, 85, 85, 0.2)",
  "rgba(88, 217, 93, 0.2)",
  "rgba(77, 116, 255, 0.2)",
  "rgba(255, 184, 0, 0.2)",
];

const borderColor = [
  "rgba(255, 85, 85, 1)",
  "rgba(88, 217, 93, 1)",
  "rgba(77, 116, 255, 1)",
  "rgba(255, 184, 0, 1",
];
