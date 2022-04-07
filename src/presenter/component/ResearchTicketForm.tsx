import React from "react";
import { Formik, FormikErrors } from "formik";
import { useDispatch, useSelector } from "react-redux";
import di from "../di";
import { AppDispatch, RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { researchMiddleware } from "../redux/middleware";
import { toast } from "react-toastify";

interface CreateResearchTicketRequest {
  groupToken: string;
}

export default function ResearchTicketForm(): JSX.Element {
  const respondentId = useSelector((state: RootState) => state.user.user?.id);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
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
        if (res) {
          toast.success('Berhasil Mendaftar ke Penelitian!');
          navigate(`./${res.payload.id}`);
        }
      });
    }
  };

  return (
    <div className="grid gap-5 justify-items-stretch">
      <h3 className="text-center font-bold text-xl text-white">
        Daftar Penelitian
      </h3>
      <Formik
        initialValues={{
          groupToken: "",
        }}
        onSubmit={handleSubmit}
        validate={async (values) => {
          const errors: FormikErrors<CreateResearchTicketRequest> = {};
          const existingTicket = (
            await di.service.researchService.getOne({
              groupToken: values.groupToken,
              full: true,
            })
          ).researchTickets.find((t) => t.respondentId === respondentId);
          if (existingTicket) {
            errors.groupToken = "Anda sudah terdaftar di penelitian ini";
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
            <div className="form-control">
              <label htmlFor="groupToken" className="text-black">
                Token Grup
              </label>
              <input
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
              className="button button-action justify-self-center"
            >
              Simpan
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}
