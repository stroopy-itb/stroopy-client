import { Formik, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  ActivityBurden,
  BodyCondition,
  KSS,
  RoomCondition,
  RoomLighting,
  RoomNoise,
  RoomTemperature,
  RoomVibration,
} from "../../../domain/model";
import { Loading } from "../../component";
import { testResultMiddleware } from "../../redux/middleware";
import { AppDispatch, RootState } from "../../redux/store";
import {
  translateActivityBurden,
  translateActivityBurdenToNumber,
  translateBodyCondition,
  translateKSS,
  translateRoomCondition,
  translateRoomLighting,
  translateRoomNoise,
  translateRoomTemperature,
  translateRoomVibration,
} from "../../utils";
import ReactTooltip from "react-tooltip";

interface CreateTestDataRequest {
  bodyCondition: BodyCondition;
  kss: KSS;
  roomCondition: RoomCondition;
  roomTemperature: number;
  roomTemperaturePerception: RoomTemperature;
  roomLighting: RoomLighting;
  roomNoise: RoomNoise;
  roomVibration: RoomVibration;
  preActivity: string;
  preActivityPhysicalBurdenWeight?: ActivityBurden;
  preActivityPhysicalBurdenFreq?: ActivityBurden;
  preActivityMentalBurdenWeight?: ActivityBurden;
  preActivityMentalBurdenFreq?: ActivityBurden;
  postActivity: string;
  postActivityPhysicalBurdenWeight?: ActivityBurden;
  postActivityPhysicalBurdenFreq?: ActivityBurden;
  postActivityMentalBurdenWeight?: ActivityBurden;
  postActivityMentalBurdenFreq?: ActivityBurden;
  testNo: number;
}

export default function Setup(): JSX.Element {
  const navigate = useNavigate();
  const testResults = useSelector(
    (state: RootState) => state.testResult.testResults
  );
  const testData = useSelector((state: RootState) => state.testResult.testData);

  const { researchId } = useParams();

  const [refreshed, setRefreshed] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(
      testResultMiddleware.getAll({
        size: -1,
        page: 1,
        filter: { researchId: researchId },
      })
    ).then(() => setRefreshed(true));
  }, [researchId, dispatch]);

  const [testNo, setTestNo] = useState(-1);
  useEffect(() => {
    if (refreshed) {
      const todayDate = new Date().toLocaleDateString();
      const todayTests = testResults?.filter(
        (t) => new Date(t.createdAt).toLocaleDateString() === todayDate
      );
      setTestNo(todayTests ? todayTests.length + 1 : -1);
    }
  }, [testResults, refreshed]);

  const initialValues: CreateTestDataRequest = {
    bodyCondition: testData?.bodyCondition || BodyCondition.Healthy,
    kss: testData?.kss || KSS.Neutral,
    roomCondition: testData?.roomCondition || RoomCondition.Indoor,
    roomTemperature: testData?.roomTemperature || 0,
    roomTemperaturePerception:
      testData?.roomTemperaturePerception || RoomTemperature.Normal,
    roomLighting: testData?.roomLighting || RoomLighting.Normal,
    roomNoise: testData?.roomNoise || RoomNoise.Normal,
    roomVibration: testData?.roomVibration || RoomVibration.None,
    preActivity: testData?.preActivity || "",
    preActivityPhysicalBurdenFreq:
      testData?.preActivityPhysicalBurdenFreq || undefined,
    preActivityPhysicalBurdenWeight:
      testData?.preActivityPhysicalBurdenWeight || undefined,
    preActivityMentalBurdenFreq:
      testData?.preActivityMentalBurdenFreq || undefined,
    preActivityMentalBurdenWeight:
      testData?.preActivityMentalBurdenWeight || undefined,
    postActivity: testData?.postActivity || "",
    postActivityPhysicalBurdenFreq:
      testData?.postActivityPhysicalBurdenFreq || undefined,
    postActivityPhysicalBurdenWeight:
      testData?.postActivityPhysicalBurdenWeight || undefined,
    postActivityMentalBurdenFreq:
      testData?.postActivityMentalBurdenFreq || undefined,
    postActivityMentalBurdenWeight:
      testData?.postActivityMentalBurdenWeight || undefined,
    testNo: testNo,
  };

  const handleSubmit = (
    values: CreateTestDataRequest,
    { setSubmitting }: FormikHelpers<CreateTestDataRequest>
  ) => {
    dispatch(
      testResultMiddleware.setTestData({
        ...values,
        correct: 0,
        wrong: 0,
        unanswered: 0,
        rtca: 0,
        id: "",
        researchId: "",
        respondentId: "",
        preActivityPhysicalBurden:
          translateActivityBurdenToNumber(
            values.preActivityPhysicalBurdenFreq
          ) +
          translateActivityBurdenToNumber(
            values.preActivityPhysicalBurdenWeight
          ),
        preActivityPhysicalBurdenFreq:
          values.preActivityPhysicalBurdenFreq || ActivityBurden.Medium,
        preActivityPhysicalBurdenWeight:
          values.preActivityPhysicalBurdenWeight || ActivityBurden.Medium,
        preActivityMentalBurden:
          translateActivityBurdenToNumber(values.preActivityMentalBurdenFreq) +
          translateActivityBurdenToNumber(values.preActivityMentalBurdenWeight),
        preActivityMentalBurdenFreq:
          values.preActivityMentalBurdenFreq || ActivityBurden.Medium,
        preActivityMentalBurdenWeight:
          values.preActivityMentalBurdenWeight || ActivityBurden.Medium,
        postActivityPhysicalBurden:
          translateActivityBurdenToNumber(
            values.postActivityPhysicalBurdenFreq
          ) +
          translateActivityBurdenToNumber(
            values.postActivityPhysicalBurdenWeight
          ),
        postActivityPhysicalBurdenWeight:
          values.postActivityPhysicalBurdenWeight || ActivityBurden.Medium,
        postActivityMentalBurdenFreq:
          values.postActivityMentalBurdenFreq || ActivityBurden.Medium,
        postActivityMentalBurden:
          translateActivityBurdenToNumber(values.postActivityMentalBurdenFreq) +
          translateActivityBurdenToNumber(
            values.postActivityMentalBurdenWeight
          ),
        postActivityPhysicalBurdenFreq:
          values.postActivityPhysicalBurdenFreq || ActivityBurden.Medium,
        postActivityMentalBurdenWeight:
          values.postActivityMentalBurdenWeight || ActivityBurden.Medium,
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString(),
      })
    );
    setSubmitting(false);
    navigate(`/test/${researchId}`);
  };

  return (
    <div className="flex-grow grid grid-flow-row gap-4 justify-items-stretch lg:justify-items-center content-center">
      {testNo > 0 ? (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values, isSubmitting, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit} className="lg:w-1/2">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="form-group lg:col-span-2">
                  <label htmlFor="testNo">Pengujian ke</label>
                  <input
                    className="form-control"
                    required
                    type="number"
                    name="testNo"
                    id="testNo"
                    placeholder="Pengujian ke"
                    value={values.testNo}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="bodyCondition">Kondisi Tubuh</label>
                  <select
                    className="form-control"
                    required
                    name="bodyCondition"
                    id="bodyCondition"
                    placeholder="Kondisi Tubuh"
                    value={values.bodyCondition}
                    onChange={handleChange}
                  >
                    {Object.entries(BodyCondition).map((item) => (
                      <option key={item[1]} value={item[1]}>
                        {translateBodyCondition(item[1])}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="bodyCondition">
                    <p
                      data-for="kss-tooltip"
                      data-tip={`Karolinska Sleepiness Scale:
                      <br />
                      1 = Sangat-sangat waspada
                      <br />
                      2 = Sangat waspada
                      <br />
                      3 = Waspada
                      <br />
                      4 = Sedikit waspada
                      <br />
                      5 = Netral, tidak merasa waspada ataupun mengantuk
                      <br />
                      6 = Sedikit mengantuk
                      <br />
                      7 = Mengantuk, tapi tidak kesulitan untuk tetap terjaga
                      <br />
                      8 = Sangat mengantuk, sedikit kesulitan untuk tetap terjaga
                      <br />
                      9 = Sangat-sangat mengantuk, berusaha keras untuk tetap terjaga, melawan kantuk
                      `}
                    >
                      {`KSS (?)`}
                    </p>
                  </label>
                  <ReactTooltip
                    id="kss-tooltip"
                    multiline={true}
                    className="text-left"
                  />
                  <select
                    className="form-control"
                    required
                    name="kss"
                    id="kss"
                    placeholder="Sleepiness"
                    value={values.kss}
                    onChange={handleChange}
                  >
                    {Object.entries(KSS).map((item) => {
                      if (typeof item[1] !== "string") {
                        return (
                          <option key={item[0]} value={item[1]}>
                            {translateKSS(item[1] as KSS)}
                          </option>
                        );
                      }
                    })}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="roomCondition">Kondisi Ruangan</label>
                  <select
                    className="form-control"
                    required
                    name="roomCondition"
                    id="roomCondition"
                    value={values.roomCondition}
                    onChange={handleChange}
                  >
                    {Object.entries(RoomCondition).map((item) => (
                      <option key={item[1]} value={item[1]}>
                        {translateRoomCondition(item[1])}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="roomTemperature">Suhu Ruangan</label>
                  <input
                    className="form-control"
                    required
                    type="number"
                    name="roomTemperature"
                    id="roomTemperature"
                    placeholder="Suhu Ruangan"
                    value={values.roomTemperature}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="roomTemperaturePerception">
                    Persepsi Suhu Ruangan
                  </label>
                  <select
                    className="form-control"
                    required
                    name="roomTemperaturePerception"
                    id="roomTemperaturePerception"
                    value={values.roomTemperaturePerception}
                    onChange={handleChange}
                  >
                    {Object.entries(RoomTemperature).map((item) => (
                      <option key={item[1]} value={item[1]}>
                        {translateRoomTemperature(item[1])}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="roomLighting">Pencahayaan Ruangan</label>
                  <select
                    className="form-control"
                    required
                    name="roomLighting"
                    id="roomLighting"
                    value={values.roomLighting}
                    onChange={handleChange}
                  >
                    {Object.entries(RoomLighting).map((item) => (
                      <option key={item[1]} value={item[1]}>
                        {translateRoomLighting(item[1])}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="roomNoise">Kebisingan Ruangan</label>
                  <select
                    className="form-control"
                    required
                    name="roomNoise"
                    id="roomNoise"
                    value={values.roomNoise}
                    onChange={handleChange}
                  >
                    {Object.entries(RoomNoise).map((item) => (
                      <option key={item[1]} value={item[1]}>
                        {translateRoomNoise(item[1])}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="roomVibration">Getaran Ruangan</label>
                  <select
                    className="form-control"
                    required
                    name="roomVibration"
                    id="roomVibration"
                    value={values.roomVibration}
                    onChange={handleChange}
                  >
                    {Object.entries(RoomVibration).map((item) => (
                      <option key={item[1]} value={item[1]}>
                        {translateRoomVibration(item[1])}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-1 lg:col-span-2 grid lg:grid-cols-2 gap-4">
                  <div className="grid gap-4">
                    <div className="form-group">
                      <label htmlFor="preActivity">Aktivitas Sebelum</label>
                      <input
                        className="form-control"
                        required
                        type="text"
                        name="preActivity"
                        id="preActivity"
                        placeholder="Aktivitas Sebelum"
                        value={values.preActivity}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="form-group">
                        <label htmlFor="preActivityPhysicalBurden">
                          Beban Fisik Sebelum
                        </label>
                        <div className="grid gap-3">
                          <select
                            className="form-control"
                            required
                            name="preActivityPhysicalBurdenFreq"
                            id="preActivityPhysicalBurdenFreq"
                            value={values.preActivityPhysicalBurdenFreq}
                            onChange={handleChange}
                          >
                            <option value="" disabled selected>
                              Frekuensi
                            </option>
                            {Object.entries(ActivityBurden).map((item) => {
                              return (
                                <option key={`act-${item[1]}`} value={item[1]}>
                                  {translateActivityBurden(item[1])}
                                </option>
                              );
                            })}
                          </select>
                          <select
                            className="form-control"
                            required
                            name="preActivityPhysicalBurdenWeight"
                            id="preActivityPhysicalBurdenWeight"
                            value={values.preActivityPhysicalBurdenWeight}
                            onChange={handleChange}
                          >
                            <option value="" disabled selected>
                              Beban
                            </option>
                            {Object.entries(ActivityBurden).map((item) => {
                              return (
                                <option key={`act-${item[1]}`} value={item[1]}>
                                  {translateActivityBurden(item[1])}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="preActivityMentalBurden">
                          Beban Mental Sebelum
                        </label>
                        <div className="grid gap-3">
                          <select
                            className="form-control"
                            required
                            name="preActivityMentalBurdenFreq"
                            id="preActivityMentalBurdenFreq"
                            value={values.preActivityMentalBurdenFreq}
                            onChange={handleChange}
                          >
                            <option value="" disabled selected>
                              Frekuensi
                            </option>
                            {Object.entries(ActivityBurden).map((item) => {
                              return (
                                <option key={`act-${item[1]}`} value={item[1]}>
                                  {translateActivityBurden(item[1])}
                                </option>
                              );
                            })}
                          </select>
                          <select
                            className="form-control"
                            required
                            name="preActivityMentalBurdenWeight"
                            id="preActivityMentalBurdenWeight"
                            value={values.preActivityMentalBurdenWeight}
                            onChange={handleChange}
                          >
                            <option value="" disabled selected>
                              Beban
                            </option>
                            {Object.entries(ActivityBurden).map((item) => {
                              return (
                                <option key={`act-${item[1]}`} value={item[1]}>
                                  {translateActivityBurden(item[1])}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-4">
                    <div className="form-group">
                      <label htmlFor="postActivity">Aktivitas Sesudah</label>
                      <input
                        className="form-control"
                        required
                        type="text"
                        name="postActivity"
                        id="postActivity"
                        placeholder="Aktivitas Sesudah"
                        value={values.postActivity}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="form-group">
                        <label htmlFor="postActivityPhysicalBurden">
                          Beban Fisik Sesudah
                        </label>
                        <div className="grid gap-3">
                          <select
                            className="form-control"
                            required
                            name="postActivityPhysicalBurdenFreq"
                            id="postActivityPhysicalBurdenFreq"
                            value={values.postActivityPhysicalBurdenFreq}
                            onChange={handleChange}
                          >
                            <option value="" disabled selected>
                              Frekuensi
                            </option>
                            {Object.entries(ActivityBurden).map((item) => {
                              return (
                                <option key={`act-${item[1]}`} value={item[1]}>
                                  {translateActivityBurden(item[1])}
                                </option>
                              );
                            })}
                          </select>
                          <select
                            className="form-control"
                            required
                            name="postActivityPhysicalBurdenWeight"
                            id="postActivityPhysicalBurdenWeight"
                            value={values.postActivityPhysicalBurdenWeight}
                            onChange={handleChange}
                          >
                            <option value="" disabled selected>
                              Beban
                            </option>
                            {Object.entries(ActivityBurden).map((item) => {
                              return (
                                <option key={`act-${item[1]}`} value={item[1]}>
                                  {translateActivityBurden(item[1])}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="postActivityMentalBurden">
                          Beban Mental Sesudah
                        </label>
                        <div className="grid gap-3">
                          <select
                            className="form-control"
                            required
                            name="postActivityMentalBurdenFreq"
                            id="postActivityMentalBurdenFreq"
                            value={values.postActivityMentalBurdenFreq}
                            onChange={handleChange}
                          >
                            <option value="" disabled selected>
                              Frekuensi
                            </option>
                            {Object.entries(ActivityBurden).map((item) => {
                              return (
                                <option key={`act-${item[1]}`} value={item[1]}>
                                  {translateActivityBurden(item[1])}
                                </option>
                              );
                            })}
                          </select>
                          <select
                            className="form-control"
                            required
                            name="postActivityMentalBurdenWeight"
                            id="postActivityMentalBurdenWeight"
                            value={values.postActivityMentalBurdenWeight}
                            onChange={handleChange}
                          >
                            <option value="" disabled selected>
                              Beban
                            </option>
                            {Object.entries(ActivityBurden).map((item) => {
                              return (
                                <option key={`act-${item[1]}`} value={item[1]}>
                                  {translateActivityBurden(item[1])}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="col-span-1 lg:col-span-2 justify-self-center button button-md button-blue"
                  disabled={isSubmitting}
                >
                  Simpan dan Mulai Tes
                </button>
              </div>
            </form>
          )}
        </Formik>
      ) : (
        <Loading />
      )}
    </div>
  );
}
