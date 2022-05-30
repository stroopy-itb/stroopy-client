import React from "react";
import { Formik, FormikErrors } from "formik";
import { useDispatch } from "react-redux";
import di from "../di";
import { AppDispatch } from "../redux/store";
import { researchMiddleware } from "../redux/middleware";
import { toast } from "react-toastify";

interface CreateResearchTicketRequest {
  groupToken: string;
}

export default function ResearchTicketForm(props: {
  page: number;
  size: number;
  respondentId?: string;
  afterSubmit?: () => void;
}): JSX.Element {
  const { respondentId, page, size, afterSubmit } = props;

  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = async (values: CreateResearchTicketRequest) => {
    if (respondentId) {
      await dispatch(
        researchMiddleware.createResearchTicket({
          dto: {
            groupToken: values.groupToken,
            respondentId: respondentId,
          },
        })
      ).then((res: any) => {
        if (res.meta.requestStatus !== "rejected") {
          console.log(res);
          toast.success("Berhasil Mendaftar ke Penelitian!");
          dispatch(
            researchMiddleware.getAllByTickets({
              size: size,
              page: page,
              filter: {},
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
        Daftar Penelitian
      </h3>
      <Formik
        initialValues={{
          groupToken: "",
        }}
        onSubmit={handleSubmit}
        validate={async (values) => {
          const errors: FormikErrors<CreateResearchTicketRequest> = {};
          const research = await di.service.researchService.getOne({
            groupToken: values.groupToken,
            full: true,
          });
          if (research.researchTickets) {
            const existingTicket = research.researchTickets.find(
              (t) => t.respondentId === respondentId
            );
            if (existingTicket) {
              errors.groupToken = "Anda sudah terdaftar di penelitian ini";
            }
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
