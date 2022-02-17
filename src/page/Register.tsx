import React from "react";
import { Formik, FormikHelpers } from "formik";
import { Link, useNavigate } from "react-router-dom";
import logo from "../logo.svg";

interface RegisterRequest {
  token: string;
  username: string;
  password: string;
  password_confirm: string;
}

export default function Login(): JSX.Element {
  const navigate = useNavigate();

  const handleSubmit = (
    values: RegisterRequest,
    { setSubmitting }: FormikHelpers<RegisterRequest>
  ) => {
    console.log(values);
    setSubmitting(false);
  };

  return (
    <div className="flex-grow grid grid-flow-row gap-10 justify-items-center content-center">
      <h1 className="grid grid-flow-col justify-items-center content-center gap-5">
        <img className="w-16" src={logo} alt="logo" />
        <span className="text-white text-5xl font-bold">Stroopy</span>
      </h1>
      <Formik
        initialValues={{
          token: "",
          username: "",
          password: "",
          password_confirm: "",
        }}
        validate={(values) => {
          const errors = { username: "", password: "", password_confirm: "" };
          if (values.password_confirm && values.password !== values.password_confirm) {
            errors.password_confirm = "Konfirmasi password salah";
          } else {
            errors.password_confirm = "";
          }

          return errors;
        }}
        validateOnChange
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, handleChange, values, errors, isSubmitting }) => (
          <form
            onSubmit={handleSubmit}
            className="md:w-1/5 grid grid-flow-row gap-5 justify-items-stretch content-center"
          >
            <div className="form-control">
              <input
                type="text"
                name="token"
                placeholder="Token"
                value={values.token}
                onChange={handleChange}
              />
              {<p className="text-white">{errors.token}</p>}
            </div>
            <div className="form-control">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={values.username}
                onChange={handleChange}
              />
              {<p className="text-white">{errors.username}</p>}
            </div>
            <div className="form-control">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
              />
              {<p className="text-white">{errors.password}</p>}
            </div>
            <div className="form-control">
              <input
                type="password"
                name="password_confirm"
                placeholder="Konfirmasi Password"
                value={values.password_confirm}
                onChange={handleChange}
              />
              {<p className="text-white">{errors.password_confirm}</p>}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="button button-action"
            >
              Daftar
            </button>
          </form>
        )}
      </Formik>
      <p className="text-white">
        Sudah punya akun?{" "}
        <Link to={"/login"} className="text-blue font-bold">
          Masuk!
        </Link>
      </p>
    </div>
  );
}
