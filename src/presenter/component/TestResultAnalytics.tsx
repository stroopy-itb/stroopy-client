import React, { useCallback, useEffect, useState } from "react";
import { Gender, ResearchTicket, TestResult } from "../../domain/model";
import { Bar } from "react-chartjs-2";
import { ChartData } from "chart.js";
import { countAge } from "../utils";

export default function TestResultAnalytics(props: {
  testResults?: TestResult[];
  researchTickets?: ResearchTicket[];
}): JSX.Element {
  const { testResults, researchTickets } = props;

  const [analyticsData, setAnalyticsData] = useState<{
    recordCount: number;
    respondentCount: number;
    avgRtca: number;
    latestRecord: Date;
  }>({
    recordCount: 0,
    respondentCount: 0,
    avgRtca: 0,
    latestRecord: new Date(0),
  });
  useEffect(() => {
    let avgRtca = 0;
    let latestRecord = new Date(0);
    testResults?.forEach((result) => {
      avgRtca += result.rtca;

      const recordValue = new Date(result.createdAt);
      if (recordValue > latestRecord) {
        latestRecord = recordValue;
      }
    });

    setAnalyticsData({
      recordCount: testResults?.length || 0,
      respondentCount: researchTickets?.length || 0,
      avgRtca: avgRtca / (testResults?.length || 1),
      latestRecord: latestRecord,
    });
  }, [testResults, researchTickets]);

  const genderRtcaData = useCallback(() => {
    let maleRecords = { total: 0, count: 0 };
    let femaleRecords = { total: 0, count: 0 };

    testResults?.forEach((result) => {
      switch (result.respondent?.profile?.gender) {
        case Gender.Male:
          maleRecords.total += result.rtca;
          maleRecords.count += 1;
          break;
        case Gender.Female:
          femaleRecords.total += result.rtca;
          femaleRecords.count += 1;
          break;
      }
    });

    let data: ChartData<"bar"> = {
      labels: ["Pria", "Wanita"],
      datasets: [
        {
          data: [
            maleRecords.total / maleRecords.count,
            femaleRecords.total / femaleRecords.count,
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
          ],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
          borderWidth: 1,
        },
      ],
    };

    return data;
  }, [testResults]);

  const ageRtcaData = useCallback(() => {
    let young = { total: 0, count: 0 };
    let teen = { total: 0, count: 0 };
    let working = { total: 0, count: 0 };
    let parent = { total: 0, count: 0 };
    let elder = { total: 0, count: 0 };

    testResults?.forEach((result) => {
      if (countAge(result.respondent?.profile?.dateOfBirth) < 12) {
        young.total += result.rtca;
        young.count += 1;
      } else if (countAge(result.respondent?.profile?.dateOfBirth) <= 24) {
        teen.total += result.rtca;
        teen.count += 1;
      } else if (countAge(result.respondent?.profile?.dateOfBirth) <= 40) {
        working.total += result.rtca;
        working.count += 1;
      } else if (countAge(result.respondent?.profile?.dateOfBirth) <= 50) {
        parent.total += result.rtca;
        parent.count += 1;
      } else if (countAge(result.respondent?.profile?.dateOfBirth) > 50) {
        elder.total += result.rtca;
        elder.count += 1;
      }
    });

    let data: ChartData<"bar"> = {
      labels: ["< 12", "13 - 24", "25 - 40", "40 - 50", "> 50"],
      datasets: [
        {
          data: [
            young.total / young.count,
            teen.total / teen.count,
            working.total / working.count,
            parent.total / parent.count,
            elder.total / elder.count,
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
          ],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
          borderWidth: 1,
        },
      ],
    };

    return data;
  }, [testResults]);

  const [respondentId, setRespondentId] = useState("");

  const respondentChartData = useCallback(() => {
    let respondentRecords: TestResult[] = [];

    testResults?.forEach((result) => {
      if (result.respondentId === respondentId) {
        respondentRecords.push(result);
      }
    });

    let data: ChartData<"bar"> = {
      labels: respondentRecords.map((record) =>
        new Date(record.createdAt).toLocaleString()
      ),
      datasets: [
        {
          data: respondentRecords.map((record) => record.rtca),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
          ],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
          borderWidth: 1,
        },
      ],
    };

    return data;
  }, [testResults, respondentId]);

  return (
    <div className="justify-self-stretch overflow-hidden">
      <div className="grid gap-5 grid-cols-4 mb-5">
        <div className="bg-gray-100 rounded-2xl p-3">
          <h2 className="text-3xl font-bold text-green">Jumlah Data</h2>
          <p className="text-3xl font-bold">{analyticsData.recordCount}</p>
        </div>
        <div className="bg-gray-100 rounded-2xl p-3">
          <h2 className="text-3xl font-bold text-yellow">Jumlah Responden</h2>
          <p className="text-3xl font-bold">{analyticsData.respondentCount}</p>
        </div>
        <div className="bg-gray-100 rounded-2xl p-3">
          <h2 className="text-3xl font-bold text-red">Rata-Rata RTCA</h2>
          <p className="text-3xl font-bold">{analyticsData.avgRtca}</p>
        </div>
        <div className="bg-gray-100 rounded-2xl p-3">
          <h2 className="text-3xl font-bold text-blue">Pengujian Terakhir</h2>
          <p className="text-3xl font-bold">
            {analyticsData.latestRecord.toLocaleString()}
          </p>
        </div>
      </div>
      <div className="grid gap-5 grid-cols-3 justify-between">
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
            <option value=""></option>
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
