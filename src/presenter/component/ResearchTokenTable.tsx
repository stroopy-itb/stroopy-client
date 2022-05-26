import React from "react";
import { ResearchToken } from "../../domain/model";
import Paginate from "./Paginate";

export default function ResearchTokenTable(props: {
  researchTokens?: ResearchToken[];
  size: number;
  page: number;
  totalSize: number;
  changePage?: (event: any) => void;
  showModal: (token: ResearchToken) => void;
}): JSX.Element {
  const { researchTokens, size, page, totalSize, changePage, showModal } = props;

  return (
    <div className="justify-self-stretch overflow-hidden">
      <div className="flex justify-between mb-5">
        <Paginate
          size={size}
          page={page}
          totalSize={totalSize}
          changePage={changePage}
        />
      </div>
      <div className="bg-gray-100 rounded-2xl overflow-auto md:p-5">
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
                        className="button button-md button-blue p-1 px-5 text-base"
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
    </div>
  );
}
