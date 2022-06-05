import { Research, ResearchToken, User } from "../../domain/model";
import { UserRole } from "../../domain/model/UserRole";
import { ResearchSetupInfo } from ".";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { researchMiddleware } from "../redux/middleware";
import { toast } from "react-toastify";
import { useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

export default function ResearchHeader(props: {
  research?: Research;
  researchToken?: ResearchToken;
  user?: User;
  tokenExpired: boolean;
  editable: boolean;
}): JSX.Element {
  const { research, researchToken, user, tokenExpired, editable } = props;

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const deleteResearch = (id?: string) => {
    if (!id) {
      return;
    }
    dispatch(researchMiddleware.delete({ id })).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate('/researcher/research');
        toast.success(`Penelitian berhasil dihapus`);
      }
    });
  };

  return (
    <div className="grid grid-flow-row gap-5 justify-items-center content-start">
      <h1 className="text-center text-3xl font-bold text-gray-100">
        Detail Penelitian
      </h1>
      <h3 className="text-center text-lg text-gray-100">ID: {research?.id}</h3>
      <div className="grid grid-flow-row lg:grid-flow-col gap-5 w-full">
        <div className="justify-self-stretch bg-gray-100 rounded-2xl overflow-auto md:p-2">
          <table className="table-auto w-full">
            <thead>
              <tr className="font-bold">
                <td className="py-1 px-2 border-b-2 border-black">
                  Token Grup
                </td>
                <td className="py-1 px-2 border-b-2 border-black">Dibuat</td>
                <td className="py-1 px-2 border-b-2 border-black">Diupdate</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-1 px-2">{research?.groupToken}</td>
                <td className="py-1 px-2">
                  {new Date(research?.createdAt || "").toLocaleString()}
                </td>
                <td className="py-1 px-2">
                  {new Date(research?.updatedAt || "").toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="justify-self-stretch bg-gray-100 rounded-2xl overflow-auto md:p-2">
          <table className="table-auto w-full">
            <thead>
              <tr className="font-bold">
                <td className="py-1 px-2 border-b-2 border-black">
                  Token Penelitian
                </td>
                <td className="py-1 px-2 border-b-2 border-black">
                  Kadaluarsa
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-1 px-2">{researchToken?.token}</td>
                <td className={`py-1 px-2 ${tokenExpired ? "text-red" : ""}`}>
                  {new Date(researchToken?.expiredAt || "").toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {user?.role !== UserRole.Researcher ? (
          <div>
            <div className="justify-self-stretch bg-gray-100 rounded-2xl overflow-auto md:p-2">
              <table className="table-auto w-full">
                <thead>
                  <tr className="font-bold">
                    <td className="py-1 px-2 border-b-2 border-black">
                      Username Peneliti
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-1 px-2">
                      {research?.researcher?.username}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <h3 className="text-lg font-bold text-gray-100">Pengaturan Penelitian</h3>
      <ResearchSetupInfo
        research={research}
        user={user}
        editable={editable && !tokenExpired}
      />
      {user?.role === UserRole.Researcher && editable ? (
        <button
          onClick={() => setDeleteModalOpen(true)}
          className="button button-md button-red px-5 w-full"
        >
          Hapus Penelitian
        </button>
      ) : (
        ""
      )}
      <Modal
        isOpen={deleteModalOpen}
        onRequestClose={() => setDeleteModalOpen(false)}
        className="place-self-center lg:w-1/4 w-screen bg-black rounded-2xl p-8"
        overlayClassName="fixed top-0 bottom-0 left-0 right-0 w-screen h-screen bg-gray-100 bg-opacity-10 grid"
      >
        <h3 className="text-xl text-neutral-100 font-bold text-center mb-5">
          Hapus penelitian ini?
        </h3>
        <div className="grid grid-flow-col gap-2">
          <button
            onClick={() => deleteResearch(research?.id)}
            className="button button-md button-red"
          >
            Ya
          </button>
          <button
            onClick={() => setDeleteModalOpen(false)}
            className="button button-md button-green"
          >
            Tidak
          </button>
        </div>
      </Modal>
    </div>
  );
}
