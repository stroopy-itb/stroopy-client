import React from "react";
import { Formik, FormikErrors, FormikHelpers } from "formik";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../logo.svg";
import { CreateUserDto } from "../../adapter/dto";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { userMiddleware } from "../redux/middleware/UserMiddleware";
import { toast } from "react-toastify";

interface RegisterRequest extends CreateUserDto {
  token: string;
  username: string;
  password: string;
  password_confirm: string;
}

export default function Login(): JSX.Element {
  const userError = useSelector((state: RootState) => state.user.error);

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = async (
    values: RegisterRequest,
    { setSubmitting }: FormikHelpers<RegisterRequest>
  ) => {
    const request = await dispatch(
      userMiddleware.register({
        token: values.token,
        username: values.username,
        password: values.password,
      })
    );
    if (request.meta.requestStatus === "fulfilled") {
      toast.success("Registrasi Berhasil!");
      navigate("/login");
    }

    setSubmitting(false);
  };

  return (
    <div className="flex-grow grid grid-flow-row gap-10 justify-items-center content-center">
      <h1 className="grid grid-flow-col justify-items-center content-center gap-5">
        <img className="w-16" src={logo} alt="logo" />
        <span className="text-gray-100 text-5xl font-bold">Stroopy</span>
      </h1>
      {userError ? <p className="text-md text-red">{userError.message}</p> : ""}
      <Formik
        initialValues={{
          token: "",
          username: "",
          password: "",
          password_confirm: "",
        }}
        validate={(values) => {
          const errors: FormikErrors<RegisterRequest> = {};
          if (
            values.password_confirm &&
            values.password !== values.password_confirm
          ) {
            errors.password_confirm = "Konfirmasi password salah";
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
                name="username"
                placeholder="Username"
                value={values.username}
                onChange={handleChange}
                required
                autoFocus
              />
              {<p className="text-red">{errors.username}</p>}
            </div>
            <div className="form-control">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={values.password}
                required
                onChange={handleChange}
              />
              {<p className="text-red">{errors.password}</p>}
            </div>
            <div className="form-control">
              <input
                type="password"
                name="password_confirm"
                placeholder="Konfirmasi Password"
                value={values.password_confirm}
                required
                onChange={handleChange}
              />
              {<p className="text-red">{errors.password_confirm}</p>}
            </div>
            <div className="form-control">
              <input
                type="text"
                name="token"
                placeholder="Token"
                value={values.token}
                onChange={handleChange}
              />
              {<p className="text-red">{errors.token}</p>}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="button button-md button-blue"
            >
              Daftar
            </button>
          </form>
        )}
      </Formik>
      <p className="text-gray-100">
        Sudah punya akun?{" "}
        <Link to={"/login"} className="text-blue font-bold">
          Masuk!
        </Link>
      </p>
    </div>
  );
}
