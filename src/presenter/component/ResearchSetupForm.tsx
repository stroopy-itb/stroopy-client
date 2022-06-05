import { Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Research } from "../../domain/model";
import { researchMiddleware } from "../redux/middleware";
import { AppDispatch } from "../redux/store";

export default function ResearchSetupForm(props: {
  data?: Research;
  afterSubmit?: () => void;
}): JSX.Element {
  const { data, afterSubmit } = props;

  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = async (values: { rounds: number; timeout: number }) => {
    if (data?.researchSetup) {
      await dispatch(
        researchMiddleware.updateResearchSetup({
          dto: {
            ...data.researchSetup,
            rounds: values.rounds,
            timeout: values.timeout,
          },
        })
      ).then(async (res) => {
        if (res.meta.requestStatus === "fulfilled") {
          toast.success("Pengaturan Penelitian berhasil diperbarui!");
          if (afterSubmit) afterSubmit();
        }
      });
    } else {
      await dispatch(
        researchMiddleware.createResearchSetup({
          dto: {
            ...values,
            researchId: data?.id || "",
          },
        })
      ).then(async (res) => {
        if (res.meta.requestStatus === "fulfilled") {
          toast.success("Pengaturan Penelitian berhasil dibuat!");
          if (afterSubmit) afterSubmit();
        }
      });
    }
  };

  return (
    <Formik
      initialValues={{
        rounds: data?.researchSetup?.rounds || 50,
        timeout: data?.researchSetup?.timeout || 3,
      }}
      onSubmit={handleSubmit}
    >
      {({ values, errors, isSubmitting, handleChange, handleSubmit }) => (
        <form className="w-full" onSubmit={handleSubmit}>
          <table className="table-auto w-full">
            <thead>
              <tr className="font-bold">
                <td className="py-1 px-2 border-b-2 border-black">
                  Pengulangan
                </td>
                <td className="py-1 px-2 border-b-2 border-black">
                  Waktu Perulangan (Detik)
                </td>
                <td className="py-1 px-2 border-b-2 border-black"></td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2">
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="number"
                      min={30}
                      max={200}
                      name="rounds"
                      id="rounds"
                      placeholder="Token Grup"
                      value={values.rounds}
                      onChange={handleChange}
                      autoFocus
                    />
                  </div>
                </td>
                <td className="p-2">
                  <div className="form-group">
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
                </td>
                <td className="p-2 grid grid-flow-col gap-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="button button-sm button-green py-3"
                  >
                    Simpan
                  </button>
                  <button
                    disabled={isSubmitting}
                    onClick={() => {
                      if (afterSubmit) afterSubmit();
                    }}
                    className="button button-sm py-3 button-red"
                  >
                    Batal
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      )}
    </Formik>
  );
}
