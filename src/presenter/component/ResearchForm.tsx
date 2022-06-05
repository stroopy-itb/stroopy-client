import React from "react";
import { Formik, FormikErrors } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Research } from "../../domain/model";
import di from "../di";
import researchMiddleware from "../redux/middleware/ResearchMiddleware";
import { AppDispatch, RootState } from "../redux/store";
import { toast } from "react-toastify";

interface CreateResearchRequest {
  groupToken: string;
  city: string;
  location: string;
  address: string;
  rounds: number;
  timeout: number;
}

export default function ResearchForm(props: {
  data?: Research;
  afterSubmit?: () => void;
}): JSX.Element {
  const { data, afterSubmit } = props;

  const researcherId = useSelector((state: RootState) => state.user.user?.id);
  const researchTokenId = useSelector(
    (state: RootState) => state.researchToken.researchersToken?.id
  );

  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = async (values: CreateResearchRequest) => {
    if (data) {
      await dispatch(
        researchMiddleware.update({
          dto: {
            ...data,
            groupToken: values.groupToken,
            city: values.city,
            location: values.location,
            address: values.address,
            researcherId: data.researcherId || "",
            researchTokenId: data.researchTokenId || "",
          },
        })
      ).then(async (res) => {
        if (res.meta.requestStatus === "fulfilled") {
          toast.success("Penelitian berhasil diperbarui!");
          if (afterSubmit) afterSubmit();
        }
      });
    } else {
      await dispatch(
        researchMiddleware.create({
          dto: {
            groupToken: values.groupToken,
            city: values.city,
            location: values.location,
            address: values.address,
            researchSetup: {
              rounds: values.rounds,
              timeout: values.timeout,
            },
            researcherId: researcherId || "",
            researchTokenId: researchTokenId || "",
          },
        })
      ).then(async (res) => {
        if (res.meta.requestStatus === "fulfilled") {
          toast.success("Penelitian baru berhasil dibuat!");
          await dispatch(
            researchMiddleware.getAll({
              size: 10,
              page: 1,
              filter: { full: true },
            })
          );
          if (afterSubmit) afterSubmit();
        }
      });
    }
  };

  return (
    <div className="grid gap-5 justify-items-stretch">
      <h3 className="text-center font-bold text-xl text-gray-100">
        {data ? "Edit Penelitian" : "Buat Penelitian"}
      </h3>
      <Formik
        initialValues={{
          groupToken: data?.groupToken || "",
          city: data?.city || "",
          location: data?.location || "",
          address: data?.address || "",
          rounds: 50,
          timeout: 2,
        }}
        onSubmit={handleSubmit}
        validate={async (values) => {
          const errors: FormikErrors<CreateResearchRequest> = {};
          const existingResearch = await di.service.researchService.getOne({
            groupToken: values.groupToken,
          });
          if (existingResearch && (!data || data.id !== existingResearch.id)) {
            errors.groupToken = "Token grup sudah ada";
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
              <label htmlFor="groupToken" className="text-black">
                Token Grup
              </label>
              <input
                className="form-control"
                type="text"
                name="groupToken"
                id="groupToken"
                placeholder="Token Grup"
                value={values.groupToken}
                onChange={handleChange}
                autoFocus
              />
              {<p className="text-red">{errors.groupToken}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="city" className="text-black">
                Kota Tempat Penelitan
              </label>
              <input
                className="form-control"
                type="text"
                name="city"
                id="city"
                placeholder="Kota Tempat Penelitan"
                value={values.city}
                onChange={handleChange}
                autoFocus
              />
              {<p className="text-red">{errors.city}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="location" className="text-black">
                Tempat Penelitian
              </label>
              <input
                className="form-control"
                type="text"
                name="location"
                id="location"
                placeholder="Tempat Penelitian"
                value={values.location}
                onChange={handleChange}
                autoFocus
              />
              {<p className="text-red">{errors.location}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="address" className="text-black">
                Alamat Penelitian
              </label>
              <input
                className="form-control"
                type="text"
                name="address"
                id="address"
                placeholder="Alamat Penelitian"
                value={values.address}
                onChange={handleChange}
                autoFocus
              />
              {<p className="text-red">{errors.address}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="rounds" className="text-black">
                Pengulangan
              </label>
              <input
                className="form-control"
                type="number"
                min={30}
                max={200}
                name="rounds"
                id="rounds"
                placeholder="Pengulangan"
                value={values.rounds}
                onChange={handleChange}
                autoFocus
              />
              {<p className="text-red">{errors.rounds}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="rounds" className="text-black">
                Waktu Perulangan (Detik)
              </label>
              <input
                className="form-control"
                type="number"
                min={1}
                max={3}
                step={0.01}
                name="timeout"
                id="timeout"
                placeholder="Token Grup"
                value={values.timeout}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="justify-self-center button button-md button-green"
            >
              Simpan
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}
