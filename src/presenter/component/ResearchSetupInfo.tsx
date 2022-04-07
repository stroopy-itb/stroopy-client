import { Formik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Research, User } from "../../domain/model";
import { UserRole } from "../../domain/model/UserRole";
import researchMiddleware from "../redux/middleware/ResearchMiddleware";
import { AppDispatch } from "../redux/store";

export default function ResearchSetupInfo(props: {
  research?: Research;
  user?: User;
  tokenExpired: boolean;
}): JSX.Element {
  const { research, user, tokenExpired } = props;

  const [setupForm, setSetupForm] = useState({
    isOpen: false,
    data: research?.researchSetup,
  });

  return (
    <div className="justify-self-stretch bg-white rounded-2xl overflow-auto md:p-2">
      {!setupForm.isOpen ? (
        research?.researchSetup ? (
          <table className="table-auto w-full">
            <thead>
              <tr className="font-bold">
                <td className="py-1 px-2 border-b-2 border-black">
                  Pengulangan
                </td>
                <td className="py-1 px-2 border-b-2 border-black"></td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-1 px-2">{research.researchSetup.rounds}</td>
                <td className="py-1 px-2 text-right">
                  {user?.role === UserRole.Researcher && !tokenExpired ? (
                    <button
                      className="button button-action p-3"
                      onClick={() =>
                        setSetupForm({
                          isOpen: true,
                          data: research?.researchSetup,
                        })
                      }
                    >
                      Update
                    </button>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        ) : user?.role === UserRole.Researcher && !tokenExpired ? (
          <button
            className="button bg-red w-full"
            onClick={() =>
              setSetupForm({ isOpen: true, data: research?.researchSetup })
            }
          >
            Pengaturan tidak ditemukan. Klik untuk membuat pengaturan
          </button>
        ) : (
          <h4 className="text-center text-red font-bold p-4">
            Pengaturan tidak ditemukan
          </h4>
        )
      ) : (
        <SetupForm
          data={research}
          afterSubmit={() => setSetupForm({ ...setupForm, isOpen: false })}
        />
      )}
    </div>
  );
}

function SetupForm(props: {
  data?: Research;
  afterSubmit?: () => void;
}): JSX.Element {
  const { data, afterSubmit } = props;

  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = async (values: { rounds: number }) => {
    if (data?.researchSetup) {
      await dispatch(
        researchMiddleware.updateResearchSetup({
          dto: {
            ...data.researchSetup,
            rounds: values.rounds,
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
                <td className="py-1 px-2 border-b-2 border-black"></td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2">
                  <div className="form-control">
                    <input
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
                <td className="p-2 grid grid-flow-col gap-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="button button-action py-3"
                  >
                    Simpan
                  </button>
                  <button
                    disabled={isSubmitting}
                    onClick={() => {
                      if (afterSubmit) afterSubmit();
                    }}
                    className="button button-action py-3 bg-red"
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
