import { Formik, FormikHelpers } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  ActivityBurden,
  BodyCondition,
  DeviceType,
  RoomCondition,
} from "../../../domain/model";
import { testResultMiddleware } from "../../redux/middleware";
import { AppDispatch, RootState } from "../../redux/store";
import { translateActivityBurden, translateBodyCondition, translateRoomCondition } from "../../utils";

interface CreateTestDataRequest {
  bodyCondition: BodyCondition;
  bodyTemp: number;
  device: DeviceType;
  roomCondition: RoomCondition;
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

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (!testResults) {
      dispatch(testResultMiddleware.getAll({ researchId: researchId }));
    }
  }, [testResults, researchId, dispatch]);

  const countLatestTest = () => {
    if (testResults && testResults.length !== 0) {
      const sortedResults = testResults
        ?.slice()
        .sort((a, b) => b.testNo - a.testNo);

      return sortedResults[0].testNo + 1;
    } else {
      console.log("empty");
      return 1;
    }
  };

  const initialValues: CreateTestDataRequest = {
    bodyCondition: testData?.bodyCondition || BodyCondition.Healthy,
    bodyTemp: testData?.bodyTemp || 0,
    device: testData?.device || DeviceType.PC,
    roomCondition: testData?.roomCondition || RoomCondition.Indoor,
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
    testNo: countLatestTest(),
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
    <div className="flex-grow grid grid-flow-row gap-5 justify-items-center content-center">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, isSubmitting, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit} className="md:w-1/2">
            <div className="grid gap-7">
              <div className="form-control">
                <label htmlFor="testNo">Pengujian ke</label>
                <input
                  required
                  type="number"
                  name="testNo"
                  id="testNo"
                  placeholder="Pengujian ke"
                  value={values.testNo}
                  onChange={handleChange}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="form-control">
                  <label htmlFor="bodyCondition">Kondisi Tubuh</label>
                  <select
                    required
                    name="bodyCondition"
                    id="bodyCondition"
                    placeholder="Kondisi Tubuh"
                    value={values.bodyCondition}
                    onChange={handleChange}
                  >
                    {Object.entries(BodyCondition).map((item) => (
                      <option key={item[0]} value={item[0]}>
                        {translateBodyCondition(item[1])}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-control">
                  <label htmlFor="bodyTemp">Temperatur Tubuh</label>
                  <input
                    required
                    type="number"
                    name="bodyTemp"
                    id="bodyTemp"
                    placeholder="Suhu Tubuh"
                    value={values.bodyTemp}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="form-control">
                  <label htmlFor="device">Device</label>
                  <select
                    required
                    name="device"
                    id="device"
                    placeholder="Tipe Device"
                    value={values.device}
                    onChange={handleChange}
                  >
                    {Object.entries(DeviceType).map((item) => (
                      <option key={item[0]} value={item[0]}>
                        {item[1]}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-control">
                  <label htmlFor="roomCondition">Kondisi Ruangan</label>
                  <select
                    required
                    name="roomCondition"
                    id="roomCondition"
                    value={values.roomCondition}
                    onChange={handleChange}
                  >
                    {Object.entries(RoomCondition).map((item) => (
                      <option key={item[0]} value={item[0]}>
                        {translateRoomCondition(item[1])}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="grid gap-5">
                  <div className="form-control">
                    <label htmlFor="preActivity">Aktivitas Sebelum</label>
                    <input
                      required
                      type="text"
                      name="preActivity"
                      id="preActivity"
                      placeholder="Aktivitas Sebelum"
                      value={values.preActivity}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-control">
                    <label htmlFor="preActivityPhysicalBurden">
                      Beban Fisik
                    </label>
                    <select
                      required
                      name="preActivityPhysicalBurden"
                      id="preActivityPhysicalBurden"
                      value={values.preActivityPhysicalBurden}
                      onChange={handleChange}
                    >
                      {Object.entries(ActivityBurden).map((item) => (
                        <option key={`post-phys-${item[0]}`} value={item[0]}>
                          {translateActivityBurden(item[1])}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-control">
                    <label htmlFor="preActivityMentalBurden">
                      Beban Mental
                    </label>
                    <select
                      required
                      name="preActivityMentalBurden"
                      id="preActivityMentalBurden"
                      value={values.preActivityMentalBurden}
                      onChange={handleChange}
                    >
                      {Object.entries(ActivityBurden).map((item) => (
                        <option key={`post-phys-${item[0]}`} value={item[0]}>
                          {translateActivityBurden(item[1])}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid gap-5">
                  <div className="form-control">
                    <label htmlFor="postActivity">Aktivitas Sesudah</label>
                    <input
                      required
                      type="text"
                      name="postActivity"
                      id="postActivity"
                      placeholder="Aktivitas Sesudah"
                      value={values.postActivity}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-control">
                    <label htmlFor="postActivityPhysicalBurden">
                      Beban Fisik
                    </label>
                    <select
                      required
                      name="postActivityPhysicalBurden"
                      id="postActivityPhysicalBurden"
                      value={values.postActivityPhysicalBurden}
                      onChange={handleChange}
                    >
                      {Object.entries(ActivityBurden).map((item) => (
                        <option key={`post-phys-${item[0]}`} value={item[0]}>
                          {translateActivityBurden(item[1])}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-control">
                    <label htmlFor="postActivityMentalBurden">
                      Beban Mental
                    </label>
                    <select
                      required
                      name="postActivityMentalBurden"
                      id="postActivityMentalBurden"
                      value={values.postActivityMentalBurden}
                      onChange={handleChange}
                    >
                      {Object.entries(ActivityBurden).map((item) => (
                        <option key={`post-phys-${item[0]}`} value={item[0]}>
                          {translateActivityBurden(item[1])}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="justify-self-center w-64 button button-action hover:button-hover"
                disabled={isSubmitting}
              >
                Simpan dan Mulai Tes
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
