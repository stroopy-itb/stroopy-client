import React, { useCallback } from "react";
import { Formik, FormikHelpers } from "formik";
import { Gender, InstitutionType, User, UserProfile } from "../../domain/model";
import { CreateUserProfileDto } from "../../adapter/dto";
import { translateGender, translateInstitutionType } from "../utils";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { userMiddleware } from "../redux/middleware";
import { toast } from "react-toastify";

export default function UserProfileForm(props: {
  user?: User;
  profile?: UserProfile;
  afterSubmit?: () => void;
}): JSX.Element {
  const { user, profile, afterSubmit } = props;

  const initialValues: CreateUserProfileDto = {
    name: profile?.name || "",
    identityNumber: profile?.identityNumber || "",
    email: profile?.email || "",
    phone: profile?.phone || "",
    dateOfBirth: profile?.dateOfBirth || "",
    gender: profile?.gender || Gender.Male,
    ethnicGroup: profile?.ethnicGroup || "",
    job: profile?.job || "",
    institutionType: profile?.institutionType || InstitutionType.GENERAL,
    institution: profile?.institution || "",
    faculty: profile?.faculty || "",
    study: profile?.study || "",
    userId: user?.id || "",
  };

  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = useCallback(
    (
      values: CreateUserProfileDto,
      { setSubmitting }: FormikHelpers<CreateUserProfileDto>
    ) => {
      if (profile) {
        console.log(values);
        dispatch(
          userMiddleware.updateProfile({
            dto: {
              id: profile.id,
              createdAt: profile.createdAt,
              updatedAt: profile.updatedAt,
              name: values.name,
              identityNumber: values.identityNumber,
              email: values.email,
              phone: values.phone,
              dateOfBirth: values.dateOfBirth,
              gender: values.gender,
              ethnicGroup: values.ethnicGroup,
              job: values.job,
              institutionType: values.institutionType,
              institution: values.institution,
              faculty: values.faculty,
              study: values.study,
              userId: profile.userId,
            },
          })
        ).then(async (res) => {
          if (res.meta.requestStatus === "fulfilled") {
            toast.success("Profil berhasil diperbarui!");
            if (afterSubmit) afterSubmit();
          }
        });
      } else {
        dispatch(
          userMiddleware.createProfile({
            dto: {
              name: values.name,
              identityNumber: values.identityNumber,
              email: values.email,
              phone: values.phone,
              dateOfBirth: values.dateOfBirth,
              gender: values.gender,
              ethnicGroup: values.ethnicGroup,
              job: values.job,
              institutionType: values.institutionType,
              institution: values.institution,
              faculty: values.faculty,
              study: values.study,
              userId: user?.id || "",
            },
          })
        ).then(async (res) => {
          if (res.meta.requestStatus === "fulfilled") {
            toast.success("Profil berhasil dibuat!");
            if (afterSubmit) afterSubmit();
          }
        });
      }
      setSubmitting(false);
      if (afterSubmit) {
        afterSubmit();
      }
    },
    [profile, user, dispatch, afterSubmit]
  );

  return (
    <div className="grid grid-flow-row gap-5 justify-items-around content-stretch">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, isSubmitting, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
            <div>
              <h3 className="py-3 text-lg font-bold">Nama</h3>
              <div className="form-group">
                <input
                  className="form-control"
                  required
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Nama"
                  value={values.name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <h3 className="py-3 text-lg font-bold">No. Identitas</h3>
              <div className="form-group">
                <input
                  className="form-control"
                  required
                  type="text"
                  name="identityNumber"
                  id="identityNumber"
                  placeholder="No. Identitas"
                  value={values.identityNumber}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <h3 className="py-3 text-lg font-bold">E-Mail</h3>
              <div className="form-group">
                <input
                  className="form-control"
                  required
                  type="email"
                  name="email"
                  id="email"
                  placeholder="E-Mail"
                  value={values.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <h3 className="py-3 text-lg font-bold">No. Telepon</h3>
              <div className="form-group">
                <input
                  className="form-control"
                  required
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="No. Telepon"
                  value={values.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <h3 className="py-3 text-lg font-bold">Tanggal Lahir</h3>
              <div className="form-group">
                <input
                  className="form-control"
                  required
                  type="date"
                  name="dateOfBirth"
                  id="dateOfBirth"
                  placeholder="Tanggal Lahir"
                  value={values.dateOfBirth.toLocaleString()}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <h3 className="py-3 text-lg font-bold">Gender</h3>
              <div className="form-group">
                <select
                  className="form-control"
                  required
                  name="gender"
                  id="gender"
                  placeholder="Gender"
                  value={values.gender}
                  onChange={handleChange}
                >
                  {Object.entries(Gender).map((item) => (
                    <option key={item[1]} value={item[1]}>
                      {translateGender(item[1])}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <h3 className="py-3 text-lg font-bold">Suku</h3>
              <div className="form-group">
                <input
                  className="form-control"
                  required
                  type="text"
                  name="ethnicGroup"
                  id="ethnicGroup"
                  placeholder="Suku"
                  value={values.ethnicGroup}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <h3 className="py-3 text-lg font-bold">Pekerjaan</h3>
              <div className="form-group">
                <input
                  className="form-control"
                  required
                  type="text"
                  name="job"
                  id="job"
                  placeholder="Pekerjaan"
                  value={values.job}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <h3 className="py-3 text-lg font-bold">Tipe Institusi</h3>
              <div className="form-group">
                <select
                  className="form-control"
                  required
                  name="institutionType"
                  id="institutionType"
                  placeholder="Tipe Institusi"
                  value={values.institutionType}
                  onChange={handleChange}
                >
                  {Object.entries(InstitutionType).map((item) => (
                    <option key={item[1]} value={item[1]}>
                      {translateInstitutionType(item[1])}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <h3 className="py-3 text-lg font-bold">Institusi</h3>
              <div className="form-group">
                <input
                  className="form-control"
                  required
                  type="text"
                  name="institution"
                  id="institution"
                  placeholder="Institusi"
                  value={values.institution}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <h3 className="py-3 text-lg font-bold">Fakultas</h3>
              <div className="form-group">
                <input
                  className="form-control"
                  required
                  type="text"
                  name="faculty"
                  id="faculty"
                  placeholder="Fakultas"
                  value={values.faculty}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <h3 className="py-3 text-lg font-bold">Program Studi</h3>
              <div className="form-group">
                <input
                  className="form-control"
                  required
                  type="text"
                  name="study"
                  id="study"
                  placeholder="Program Studi"
                  value={values.study}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-5">
              <button
                type="submit"
                className="w-full button button-md button-green"
                disabled={isSubmitting}
              >
                Simpan
              </button>
              <button
                type="button"
                className="w-full button button-md button-red"
                disabled={isSubmitting}
                onClick={afterSubmit}
              >
                Batal
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
