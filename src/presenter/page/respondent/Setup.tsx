import { Formik, FormikHelpers } from "formik";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ActivityBurden,
  BodyCondition,
  DeviceType,
  RoomCondition,
} from "../../../domain/model";
import { RootState } from "../../redux/store";

interface CreateTestDataRequest {
  user_id: string;
  body_condition: BodyCondition;
  body_temp: number;
  device: DeviceType;
  room_condition: RoomCondition;
  pre_activity: string;
  pre_activity_physical_burden: ActivityBurden;
  pre_activity_mental_burden: ActivityBurden;
  post_activity: string;
  post_activity_physical_burden: ActivityBurden;
  post_activity_mental_burden: ActivityBurden;
  exam_no: number;
}

export default function Setup(): JSX.Element {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);

  const initialValues: CreateTestDataRequest = {
    user_id: user?.id || "",
    body_condition: BodyCondition.Healthy,
    body_temp: 0,
    device: DeviceType.PC,
    room_condition: RoomCondition.Indoor,
    pre_activity: "",
    pre_activity_physical_burden: ActivityBurden.Light,
    pre_activity_mental_burden: ActivityBurden.Light,
    post_activity: "",
    post_activity_physical_burden: ActivityBurden.Light,
    post_activity_mental_burden: ActivityBurden.Light,
    exam_no: 0,
  };

  const handleSubmit = (
    values: CreateTestDataRequest,
    { setSubmitting }: FormikHelpers<CreateTestDataRequest>
  ) => {
    console.log(values);
    setSubmitting(false);
    // navigate("/test");
  };

  return (
    <div className="flex-grow grid grid-flow-row gap-5 justify-items-center content-center">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ handleChange, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit} className="md:w-1/2">
            <input type="hidden" name="user_id" />
            <div className="grid gap-7">
                <div className="form-control">
                  <label htmlFor="exam_no">Pengujian ke</label>
                  <input
                    required
                    type="number"
                    name="exam_no"
                    id="exam_no"
                    placeholder="Pengujian ke"
                    onChange={handleChange}
                  />
                </div>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="form-control">
                  <label htmlFor="body_condition">Kondisi Tubuh</label>
                  <select
                    required
                    name="body_condition"
                    id="body_condition"
                    placeholder="Kondisi Tubuh"
                    onChange={handleChange}
                  >
                    {Object.entries(BodyCondition).map((item) => (
                      <option value={item[0]}>{item[1]}</option>
                    ))}
                  </select>
                </div>
                <div className="form-control">
                  <label htmlFor="body_temp">Temperatur Tubuh</label>
                  <input
                    required
                    type="number"
                    name="body_temp"
                    id="body_temp"
                    placeholder="Suhu Tubuh"
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
                    onChange={handleChange}
                  >
                    {Object.entries(DeviceType).map((item) => (
                      <option value={item[0]}>{item[1]}</option>
                    ))}
                  </select>
                </div>
                <div className="form-control">
                  <label htmlFor="room_condition">Kondisi Ruangan</label>
                  <select
                    required
                    name="room_condition"
                    id="room_condition"
                    onChange={handleChange}
                  >
                    {Object.entries(RoomCondition).map((item) => (
                      <option value={item[0]}>{item[1]}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="grid gap-5">
                  <div className="form-control">
                    <label htmlFor="pre_activity">Aktivitas Sebelum</label>
                    <input
                      required
                      type="text"
                      name="pre_activity"
                      id="pre_activity"
                      placeholder="Aktivitas Sebelum"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-control">
                    <label htmlFor="pre_activity_physical_burden">
                      Beban Fisik
                    </label>
                    <select
                      required
                      name="pre_activity_physical_burden"
                      id="pre_activity_physical_burden"
                      onChange={handleChange}
                    >
                      {Object.entries(ActivityBurden).map((item) => (
                        <option value={item[0]}>{item[1]}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-control">
                    <label htmlFor="pre_activity_mental_burden">
                      Beban Mental
                    </label>
                    <select
                      required
                      name="pre_activity_mental_burden"
                      id="pre_activity_mental_burden"
                      onChange={handleChange}
                    >
                      {Object.entries(ActivityBurden).map((item) => (
                        <option value={item[0]}>{item[1]}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid gap-5">
                  <div className="form-control">
                    <label htmlFor="post_activity">Aktivitas Sesudah</label>
                    <input
                      required
                      type="text"
                      name="post_activity"
                      id="post_activity"
                      placeholder="Aktivitas Sesudah"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-control">
                    <label htmlFor="post_activity_physical_burden">
                      Beban Fisik
                    </label>
                    <select
                      required
                      name="post_activity_physical_burden"
                      id="post_activity_physical_burden"
                      onChange={handleChange}
                    >
                      {Object.entries(ActivityBurden).map((item) => (
                        <option value={item[0]}>{item[1]}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-control">
                    <label htmlFor="post_activity_mental_burden">
                      Beban Mental
                    </label>
                    <select
                      required
                      name="post_activity_mental_burden"
                      id="post_activity_mental_burden"
                      onChange={handleChange}
                    >
                      {Object.entries(ActivityBurden).map((item) => (
                        <option value={item[0]}>{item[1]}</option>
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
