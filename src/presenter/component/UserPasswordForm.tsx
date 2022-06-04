import React, { useCallback } from "react";
import { Formik, FormikErrors, FormikHelpers } from "formik";
import { User } from "../../domain/model";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { userMiddleware } from "../redux/middleware";
import { toast } from "react-toastify";

interface UpdatePasswordRequest {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

export default function UserPasswordForm(props: { user?: User }): JSX.Element {
  const { user } = props;

  const initialValues = {
    oldPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
  };

  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = useCallback(
    (
      values: UpdatePasswordRequest,
      { setSubmitting }: FormikHelpers<UpdatePasswordRequest>
    ) => {
      if (user) {
        dispatch(
          userMiddleware.updatePassword({
            dto: {
              oldPassword: values.oldPassword,
              newPassword: values.newPassword,
            },
          })
        ).then(async (res) => {
          if (res.meta.requestStatus === "fulfilled") {
            toast.success("Password berhasil diperbarui!");
          }
        });
      }
      setSubmitting(false);
    },
    [user, dispatch]
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validate={(values) => {
        const errors: FormikErrors<UpdatePasswordRequest> = {};
        if (values.newPassword === values.oldPassword) {
          errors.newPassword= "Password Baru tidak boleh sama dengan Password Lama";
        }
        if (values.newPassword !== values.newPasswordConfirm) {
          errors.newPasswordConfirm = "Konfirmasi password tidak cocok";
        }

        return errors;
      }}
      validateOnBlur
    >
      {({ values, errors, isSubmitting, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <h3 className="py-3 text-lg font-bold">Password Lama</h3>
            <div className="form-group">
              <input
                className="form-control"
                required
                type="password"
                name="oldPassword"
                id="oldPassword"
                placeholder="Pasword Lama"
                value={values.oldPassword}
                onChange={handleChange}
              />
            </div>
            {<p className="text-red">{errors.oldPassword}</p>}
          </div>
          <div>
            <h3 className="py-3 text-lg font-bold">Password Baru</h3>
            <div className="form-group">
              <input
                className="form-control"
                required
                type="password"
                name="newPassword"
                id="newPassword"
                placeholder="Pasword Baru"
                value={values.newPassword}
                onChange={handleChange}
              />
            </div>
            {<p className="text-red">{errors.newPassword}</p>}
          </div>
          <div>
            <h3 className="py-3 text-lg font-bold">Konfirmasi Password Baru</h3>
            <div className="form-group">
              <input
                className="form-control"
                required
                type="password"
                name="newPasswordConfirm"
                id="newPasswordConfirm"
                placeholder="Konfirmasi Pasword Baru"
                value={values.newPasswordConfirm}
                onChange={handleChange}
              />
            </div>
            {<p className="text-red">{errors.newPasswordConfirm}</p>}
          </div>
          <button
            type="submit"
            className="md:w-64 button button-md button-green"
            disabled={isSubmitting}
          >
            Update
          </button>
        </form>
      )}
    </Formik>
  );
}
