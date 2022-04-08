import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ResearchToken } from "../../../domain/model";
import researchTokenMiddleware from "../../redux/middleware/ResearchTokenMiddleware";
import { AppDispatch, RootState } from "../../redux/store";
import { TokenForm } from "../../component";
import Modal from "react-modal";

export default function TokenList(): JSX.Element {
  const researchTokens = useSelector(
    (state: RootState) => state.researchToken.researchTokens
  );

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(
      researchTokenMiddleware.getAll({
        size: -1,
        page: 1,
        filter: { full: true },
      })
    );
  }, [dispatch]);

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
      <div className="justify-self-stretch bg-white rounded-2xl overflow-auto md:p-5">
        {researchTokens ? (
          <table className="table-auto w-full">
            <thead>
              <tr className="font-bold">
                <td className="py-2 px-5 border-b-2 border-black">NO.</td>
                <td className="py-2 px-5 border-b-2 border-black">ID</td>
                <td className="py-2 px-5 border-b-2 border-black">Token</td>
                <td className="py-2 px-5 border-b-2 border-black">Expire</td>
                <td className="py-2 px-5 border-b-2 border-black">Dibuat</td>
                <td className="py-2 px-5 border-b-2 border-black">Diupdate</td>
                <td className="py-2 px-5 border-b-2 border-black">
                  Username Peneliti
                </td>
                <td className="py-2 px-5 border-b-2 border-black"></td>
              </tr>
            </thead>
            <tbody>
              {researchTokens.map((row, index) => {
                return (
                  <tr key={index}>
                    <td className="py-2 px-5">{index + 1}</td>
                    <td className="py-2 px-5">{row.id}</td>
                    <td className="py-2 px-5">{row.token}</td>
                    <td className="py-2 px-5">
                      {new Date(row.expiredAt).toLocaleString()}
                    </td>
                    <td className="py-2 px-5">
                      {new Date(row.createdAt).toLocaleString()}
                    </td>
                    <td className="py-2 px-5">
                      {new Date(row.updatedAt).toLocaleString()}
                    </td>
                    <td className="py-2 px-5">
                      {row.researcher?.username || ""}
                    </td>
                    <td className="py-2 px-5 text-right">
                      <button
                        onClick={() => showModal(row)}
                        className="button button-action p-1 px-5 text-base"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          ""
        )}
      </div>
      <div className="justify-self-stretch flex justify-between">
        <button
          onClick={() => showModal(undefined)}
          className="button button-action py-3 bg-green"
        >
          Buat Token Baru
        </button>
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
