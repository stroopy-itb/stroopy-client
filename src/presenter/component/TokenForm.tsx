import React from "react";
import { Formik, FormikErrors } from "formik";
import { useDispatch } from "react-redux";
import { CreateResearchTokenDto } from "../../adapter/dto";
import { ResearchToken } from "../../domain/model";
import di from "../di";
import researchTokenMiddleware from "../redux/middleware/ResearchTokenMiddleware";
import { AppDispatch } from "../redux/store";
import { toast } from "react-toastify";

interface CreateTokenRequest extends CreateResearchTokenDto {
  token: string;
  expiredAt: string;
}

export default function TokenForm(props: {
  data?: ResearchToken;
  afterSubmit?: () => void;
}): JSX.Element {
  const { data, afterSubmit } = props;

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString || Date.now());
    const addLeadingZero = (n: number) => {
      return n < 10 ? `0${n}` : n;
    };
    const yyyy = date.getFullYear();
    const MM = addLeadingZero(date.getMonth() + 1);
    const dd = addLeadingZero(date.getDate());
    const hh = addLeadingZero(date.getHours());
    const mm = addLeadingZero(date.getMinutes());

    return `${yyyy}-${MM}-${dd}T${hh}:${mm}`;
  };

  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = async (values: CreateTokenRequest) => {
    if (data) {
      await dispatch(
        researchTokenMiddleware.update({
          dto: {
            ...data,
            token: values.token,
            expiredAt: values.expiredAt,
          },
        })
      ).then(async (res) => {
        if (res.meta.requestStatus === "fulfilled") {
          toast.success("Token berhasil diperbarui!");
          if (afterSubmit) afterSubmit();
        }
      });
    } else {
      await dispatch(researchTokenMiddleware.create({ dto: values })).then(
        async (res) => {
          if (res.meta.requestStatus === "fulfilled") {
            toast.success("Token baru berhasil dibuat!");
            dispatch(
              researchTokenMiddleware.getAll({
                size: 10,
                page: 1,
                filter: { full: true },
              })
            );
            if (afterSubmit) afterSubmit();
          }
        }
      );
    }
  };

  return (
    <div className="grid gap-5 justify-items-stretch">
      <h3 className="text-center font-bold text-xl text-gray-100">
        {data ? "Edit Token" : "Buat Token"}
      </h3>
      <Formik
        initialValues={{
          token: data?.token || "",
          expiredAt: formatDate(data?.expiredAt || ""),
        }}
        onSubmit={handleSubmit}
        validate={async (values) => {
          const errors: FormikErrors<CreateTokenRequest> = {};
          const existingToken = await di.service.researchTokenService.getOne({
            token: values.token,
          });
          if (existingToken && (!data || data.id !== existingToken.id)) {
            errors.token = "Token sudah ada";
          }

          if (new Date(values.expiredAt).valueOf() < Date.now()) {
            errors.expiredAt = "Lewat tanggal kadaluarsa";
          }

          return errors;
        }}
        validateOnBlur
      >
        {({ values, errors, isSubmitting, handleChange, handleSubmit }) => (
          <form
            className="grid gap-5 justify-items-stetch"
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <label htmlFor="token" className="text-black">
                Token
              </label>
              <input
                className="form-control"
                type="text"
                name="token"
                id="token"
                placeholder="Token"
                value={values.token}
                onChange={handleChange}
                autoFocus
              />
              {<p className="text-red">{errors.token}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="expiredAt" className="text-black">
                Kadaluarsa
              </label>
              <input
                className="form-control"
                type="datetime-local"
                name="expiredAt"
                id="expiredAt"
                placeholder="Tanggal Kadaluarsa"
                value={values.expiredAt}
                onChange={handleChange}
                autoFocus
              />
              {<p className="text-red">{errors.expiredAt}</p>}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="button button-md button-green justify-self-center"
            >
              Simpan
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}
