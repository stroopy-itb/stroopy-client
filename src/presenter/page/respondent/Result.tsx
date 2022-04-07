import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { testResultMiddleware } from "../../redux/middleware";
import { AppDispatch, RootState } from "../../redux/store";

export default function Result(): JSX.Element {
  const testData = useSelector((state: RootState) => state.testResult.testData);
  const result = useSelector((state: RootState) => state.testResult.resultData);
  const respondent = useSelector((state: RootState) => state.user.user);

  const { researchId } = useParams();

  const [uploadStatus, setUploadStatus] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (!uploadStatus && result && testData && researchId && respondent) {
      dispatch(
        testResultMiddleware.create({
          dto: {
            bodyCondition: testData?.bodyCondition,
            bodyTemp: testData?.bodyTemp,
            device: testData?.device,
            roomCondition: testData?.roomCondition,
            preActivity: testData?.preActivity,
            preActivityPhysicalBurden: testData?.preActivityPhysicalBurden,
            preActivityMentalBurden: testData?.preActivityMentalBurden,
            postActivity: testData?.postActivity,
            postActivityPhysicalBurden: testData?.postActivityPhysicalBurden,
            postActivityMentalBurden: testData?.postActivityMentalBurden,
            testNo: testData?.testNo,
            correct: result.correct,
            wrong: result.wrong,
            unanswered: result.unanswered,
            rtca: result.rtca,
            researchId,
            respondentId: respondent?.id,
          },
        })
      ).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          toast.success("Hasil Tes Berhasil Disimpan!");
          setUploadStatus(true);
        }
      });
    }
  }, [uploadStatus, result, testData, researchId, respondent, dispatch]);

  const navigate = useNavigate();
  const returnHome = () => {
    dispatch(testResultMiddleware.removeTestData());
    dispatch(testResultMiddleware.removeResultData());
    navigate('/');
  }

  return (
    <div className="flex-grow grid grid-flow-row gap-20 justify-items-center content-center">
      <h1 className="text-5xl text-white font-bold">Hasil</h1>
      <div className="text-white text-center grid grid-flow-row gap-2">
        <div className="grid grid-cols-3">
          <div>
            <h2 className="text-3xl font-bold">Benar</h2>
            <h4 className="text-xl">{result?.correct}</h4>
          </div>
          <div>
            <h2 className="text-3xl font-bold">Salah</h2>
            <h4 className="text-xl">{result?.wrong}</h4>
          </div>
          <div>
            <h2 className="text-3xl font-bold">Tidak Terjawab</h2>
            <h4 className="text-xl">{result?.unanswered}</h4>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold">RTCA</h2>
          <h3 className="text-lg font-bold">(Right Time for Correct Answer)</h3>
          <h4 className="text-xl">{result?.rtca.toPrecision(3)}</h4>
        </div>
      </div>
      <div className="h-52 overflow-y-auto text-white text-center w-full md:w-1/3">
        {result && result.answerRecords.length > 0 ? (
          <table className="w-full">
            <thead className="font-bold">
              <tr>
                <th>#</th>
                <th>Status</th>
                <th>Waktu</th>
              </tr>
            </thead>
            <tbody>
              {result.answerRecords.map((answerRecord, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{answerRecord.status}</td>
                    <td>{answerRecord.time}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          ""
        )}
      </div>
      {uploadStatus ? (
        <button
          className="w-64 button button-nav hover:button-hover"
          onClick={() => returnHome()}
        >
          Kembali ke Halaman Utama
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
