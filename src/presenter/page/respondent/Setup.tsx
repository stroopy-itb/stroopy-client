import { Formik, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  ActivityBurden,
  BodyCondition,
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
  translateBodyCondition,
  translateRoomCondition,
  translateRoomLighting,
  translateRoomNoise,
  translateRoomTemperature,
  translateRoomVibration,
} from "../../utils";

interface CreateTestDataRequest {
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
    roomCondition: testData?.roomCondition || RoomCondition.Indoor,
    roomTemperature: testData?.roomTemperature || 0,
    roomTemperaturePerception:
      testData?.roomTemperaturePerception || RoomTemperature.Normal,
    roomLighting: testData?.roomLighting || RoomLighting.Normal,
    roomNoise: testData?.roomNoise || RoomNoise.Normal,
    roomVibration: testData?.roomVibration || RoomVibration.None,
    preActivity: testData?.preActivity || "",
    preActivityPhysicalBurden:
      testData?.preActivityPhysicalBurden || ActivityBurden.Light,
    preActivityMentalBurden:
      testData?.preActivityMentalBurden || ActivityBurden.Light,
    postActivity: testData?.postActivity || "",
    postActivityPhysicalBurden:
      testData?.postActivityPhysicalBurden || ActivityBurden.Light,
    postActivityMentalBurden:
      testData?.postActivityMentalBurden || ActivityBurden.Light,
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
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString(),
      })
    );
    setSubmitting(false);
    navigate(`/test/${researchId}`);
  };

  return (
    <div className="flex-grow grid grid-flow-row gap-5 justify-items-stretch lg:justify-items-center content-center">
      {testNo > 0 ? (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values, isSubmitting, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit} className="lg:w-1/2">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
                <div className="form-group">
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
                <div className="col-span-1 lg:col-span-2 grid lg:grid-cols-2 gap-5">
                  <div className="grid gap-5">
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
                    <div className="grid grid-cols-2 gap-5">
                      <div className="form-group">
                        <label htmlFor="preActivityPhysicalBurden">
                          Beban Fisik Sebelum
                        </label>
                        <select
                          className="form-control"
                          required
                          name="preActivityPhysicalBurden"
                          id="preActivityPhysicalBurden"
                          value={values.preActivityPhysicalBurden}
                          onChange={handleChange}
                        >
                          {Object.entries(ActivityBurden).map((item) => (
                            <option
                              key={`post-phys-${item[1]}`}
                              value={item[1]}
                            >
                              {translateActivityBurden(item[1])}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="preActivityMentalBurden">
                          Beban Mental Sebelum
                        </label>
                        <select
                          className="form-control"
                          required
                          name="preActivityMentalBurden"
                          id="preActivityMentalBurden"
                          value={values.preActivityMentalBurden}
                          onChange={handleChange}
                        >
                          {Object.entries(ActivityBurden).map((item) => (
                            <option
                              key={`post-phys-${item[1]}`}
                              value={item[1]}
                            >
                              {translateActivityBurden(item[1])}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-5">
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
                    <div className="grid grid-cols-2 gap-5">
                      <div className="form-group">
                        <label htmlFor="postActivityPhysicalBurden">
                          Beban Fisik Sesudah
                        </label>
                        <select
                          className="form-control"
                          required
                          name="postActivityPhysicalBurden"
                          id="postActivityPhysicalBurden"
                          value={values.postActivityPhysicalBurden}
                          onChange={handleChange}
                        >
                          {Object.entries(ActivityBurden).map((item) => (
                            <option
                              key={`post-phys-${item[1]}`}
                              value={item[1]}
                            >
                              {translateActivityBurden(item[1])}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="postActivityMentalBurden">
                          Beban Mental Sesudah
                        </label>
                        <select
                          className="form-control"
                          required
                          name="postActivityMentalBurden"
                          id="postActivityMentalBurden"
                          value={values.postActivityMentalBurden}
                          onChange={handleChange}
                        >
                          {Object.entries(ActivityBurden).map((item) => (
                            <option
                              key={`post-phys-${item[1]}`}
                              value={item[1]}
                            >
                              {translateActivityBurden(item[1])}
                            </option>
                          ))}
                        </select>
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
