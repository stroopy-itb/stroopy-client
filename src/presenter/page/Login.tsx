import React from "react";
import { Formik, FormikHelpers } from "formik";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { authMiddleware } from "../redux/middleware/AuthMiddleware";
import { LoginDto } from "../../adapter/dto";


export default function Login(): JSX.Element {
  const authLoading = useSelector((state: RootState) => state.auth.loading);
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = async (
    values: LoginDto,
    { setSubmitting }: FormikHelpers<LoginDto>
  ) => {
    const request = await dispatch(
      authMiddleware.login({
        username: values.username,
        password: values.password,
      })
    )
    if (request.meta.requestStatus === "fulfilled") {
      navigate("/");
    }
    setSubmitting(false);
  };

  return (
    <div className="flex-grow grid grid-flow-row gap-10 justify-items-center content-center">
      <h1 className="grid grid-flow-col justify-items-center content-center gap-5">
        <img className="w-16" src={logo} alt="logo" />
        <span className="text-gray-100 text-5xl font-bold">Stroopy</span>
      </h1>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, handleChange, values, errors, isSubmitting }) => (
          <form
            onSubmit={handleSubmit}
            className="md:w-1/5 grid grid-flow-row gap-5 justify-items-stretch content-center"
          >
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                name="username"
                placeholder="Username"
                value={values.username}
                onChange={handleChange}
                autoFocus
                disabled={authLoading || isSubmitting}
                required
              />
              {<p className="text-red">{errors.username}</p>}
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="password"
                name="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                disabled={authLoading || isSubmitting}
                required
              />
              {<p className="text-red">{errors.password}</p>}
            </div>
            <button
              type="submit"
              disabled={authLoading || isSubmitting}
              className="button button-md button-blue"
            >
              Masuk
            </button>
          </form>
        )}
      </Formik>
      <p className="text-gray-100">
        Tidak punya akun?{" "}
        <Link to={"/register"} className="text-blue font-bold">
          Daftar sekarang!
        </Link>
      </p>
    </div>
  );
}
