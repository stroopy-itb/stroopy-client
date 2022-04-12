import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ResearchToken } from "../../../domain/model";
import researchTokenMiddleware from "../../redux/middleware/ResearchTokenMiddleware";
import { AppDispatch, RootState } from "../../redux/store";
import { ResearchTokenTable, TokenForm } from "../../component";
import Modal from "react-modal";

export default function TokenList(): JSX.Element {
  const researchTokens = useSelector(
    (state: RootState) => state.researchToken.researchTokens
  );
  const sizeState = useSelector((state: RootState) => state.researchToken.size);
  const pageState = useSelector((state: RootState) => state.researchToken.page);
  const totalSize = useSelector((state: RootState) => state.researchToken.totalSize);

  const [size] = useState(sizeState);
  const [page, setPage] = useState(pageState);

  const changePage = (event: any) => {
    setPage(event.selected + 1);
  };

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(
      researchTokenMiddleware.getAll({
        size: size,
        page: page,
        filter: { full: true },
      })
    );
  }, [size, page, dispatch]);

  const [tokenForm, setTokenForm] = useState<{
    isOpen: boolean;
    data?: ResearchToken;
  }>({
    isOpen: false,
    data: undefined,
  });

  const showModal = (data?: ResearchToken) => {
    setTokenForm({ isOpen: true, data });
  };

  Modal.setAppElement("#root");

  return (
    <div className="flex-grow p-10 grid grid-flow-row gap-10 justify-items-center content-start">
      <h1 className="text-4xl font-bold text-white">Token Penelitian</h1>
      {totalSize ? (
        <ResearchTokenTable
          researchTokens={researchTokens}
          size={size}
          page={page}
          totalSize={totalSize}
          changePage={changePage}
          showModal={showModal}
        />
      ) : (
        ""
      )}
      <div className="justify-self-stretch flex justify-between">
        <button
          onClick={() => showModal(undefined)}
          className="button button-action py-3 bg-green"
        >
          Buat Token Baru
        </button>
      </div>
      <Modal
        isOpen={tokenForm.isOpen}
        onRequestClose={() => setTokenForm({ isOpen: false })}
        className="place-self-center lg:w-1/4 w-screen bg-black rounded-2xl p-8"
        overlayClassName="fixed top-0 bottom-0 left-0 right-0 w-screen h-screen bg-white bg-opacity-10 grid"
      >
        <TokenForm
          data={tokenForm.data}
          afterSubmit={() => setTokenForm({ isOpen: false })}
        />
      </Modal>
    </div>
  );
}
