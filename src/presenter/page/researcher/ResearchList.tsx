import React, { useCallback, useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { Research } from "../../../domain/model";
import { UserRole } from "../../../domain/model/UserRole";
import { ResearchForm, ResearchTable } from "../../component";
import { researchTokenMiddleware } from "../../redux/middleware";
import researchMiddleware from "../../redux/middleware/ResearchMiddleware";
import { AppDispatch, RootState } from "../../redux/store";

export default function ResearchList(): JSX.Element {
  const user = useSelector((state: RootState) => state.user.user);
  const researches = useSelector(
    (state: RootState) => state.research.researches
  );
  const researchersToken = useSelector(
    (state: RootState) => state.researchToken.researchersToken
  );

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (user && user.role === UserRole.Researcher && !researchersToken) {
      dispatch(
        researchTokenMiddleware.getOneByResearcherId({ researcherId: user.id })
      );
    }
    if (!researches)
      dispatch(researchMiddleware.getAll({ size: -1, page: 1, filter: {} }));
  }, [user, researchersToken, researches, dispatch]);

  const [researchForm, setTokenForm] = useState<{
    isOpen: boolean;
    data?: Research;
  }>({
    isOpen: false,
    data: undefined,
  });

  const showModal = (data?: Research) => {
    setTokenForm({ isOpen: true, data });
  };

  Modal.setAppElement("#root");

  const tokenExpired = useCallback(() => {
    if (researchersToken) {
      return Date.now() > new Date(researchersToken.expiredAt).valueOf();
    }
    return true;
  }, [researchersToken]);

  return (
    <div className="flex-grow p-10 grid grid-flow-row gap-10 justify-items-center content-start">
      <h1 className="text-4xl font-bold text-white">Penelitian</h1>
      <ResearchTable researches={researches} />
      <div className="justify-self-stretch flex justify-between">
        {!tokenExpired() ? (
          <button
            onClick={() => showModal(undefined)}
            className="button button-action py-3 bg-green"
          >
            Buat Penelitian Baru
          </button>
        ) : (
          ""
        )}
        {/* <div className="rounded-2xl bg-white flex">
          <button className="py-2 px-4 text-gray-400">Prev</button>
          <button className="py-2 px-4 bg-blue text-white">1</button>
          <button className="py-2 px-4 text-blue">2</button>
          <button className="py-2 px-4 text-blue">3</button>
          <button className="py-2 px-4 text-blue">4</button>
          <button className="py-2 px-4 text-blue">Next</button>
        </div> */}
      </div>
      <Modal
        isOpen={researchForm.isOpen}
        onRequestClose={() => setTokenForm({ isOpen: false })}
        className="place-self-center lg:w-1/4 w-screen bg-black rounded-2xl p-8"
        overlayClassName="fixed top-0 bottom-0 left-0 right-0 w-screen h-screen bg-white bg-opacity-10 grid"
      >
        <ResearchForm
          data={researchForm.data}
          afterSubmit={() => setTokenForm({ isOpen: false })}
        />
      </Modal>
    </div>
  );
}
