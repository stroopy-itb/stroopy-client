import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { Loading, ResearchTable, ResearchTicketForm } from "../../component";
import researchMiddleware from "../../redux/middleware/ResearchMiddleware";
import { AppDispatch, RootState } from "../../redux/store";

export default function RespondentResearchList(): JSX.Element {
  const user = useSelector((state: RootState) => state.user.user);
  const researches = useSelector(
    (state: RootState) => state.research.researches
  );
  const sizeState = useSelector((state: RootState) => state.research.size);
  const pageState = useSelector((state: RootState) => state.research.page);
  const totalSize = useSelector((state: RootState) => state.research.totalSize);

  const [size] = useState(sizeState);
  const [page, setPage] = useState(pageState);

  const changePage = (event: any) => {
    setPage(event.selected + 1);
  };

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(
      researchMiddleware.getAllByTickets({ size: size, page: page, filter: {} })
    );
  }, [size, page, dispatch]);

  const [modal, setModal] = useState<{ isOpen: boolean }>({ isOpen: false });

  Modal.setAppElement("#root");
  return (
    <div className="flex-grow p-10 grid grid-flow-row gap-10 justify-items-center content-start">
      <h1 className="text-4xl font-bold text-gray-100">Penelitian</h1>
      {totalSize ? (
        <ResearchTable
          researches={researches}
          size={size}
          page={page}
          totalSize={totalSize}
          changePage={changePage}
          user={user}
        />
      ) : (
        <Loading />
      )}
      <div className="justify-self-stretch flex justify-between">
        <button
          onClick={() => setModal({ isOpen: true })}
          className="button button-md py-3 button-green"
        >
          Daftar Ke Penelitian
        </button>
      </div>
      <Modal
        isOpen={modal.isOpen}
        onRequestClose={() => setModal({ isOpen: false })}
        className="place-self-center lg:w-1/4 w-screen bg-black rounded-2xl p-8"
        overlayClassName="fixed top-0 bottom-0 left-0 right-0 w-screen h-screen bg-gray-100 bg-opacity-10 grid"
      >
        <ResearchTicketForm
          page={page}
          size={size}
          respondentId={user?.id}
          afterSubmit={() => setModal({ isOpen: false })}
        />
      </Modal>
    </div>
  );
}
