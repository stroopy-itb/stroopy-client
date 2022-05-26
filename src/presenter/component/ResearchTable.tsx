import React from "react";
import { useNavigate } from "react-router-dom";
import { Research, User } from "../../domain/model";
import { UserRole } from "../../domain/model/UserRole";
import Paginate from "./Paginate";

export default function ResearchTable(props: {
  researches?: Research[];
  size: number;
  page: number;
  totalSize: number;
  changePage?: (event: any) => void;
  user?: User;
}): JSX.Element {
  const { researches, size, page, totalSize, changePage, user } = props;

  const navigate = useNavigate();

  const tokenExpired = (research: Research) => {
    if (research?.researchToken) {
      return Date.now() > new Date(research.researchToken.expiredAt).valueOf();
    }
    return true;
  };

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
        {researches ? (
          <table className="table-auto w-full">
            <thead>
              <tr className="font-bold">
                <td className="py-2 px-5 border-b-2 border-black">NO.</td>
                <td className="py-2 px-5 border-b-2 border-black">ID</td>
                <td className="py-2 px-5 border-b-2 border-black">Token</td>
                <td className="py-2 px-5 border-b-2 border-black">Tanggal Kadaluarsa</td>
                <td className="py-2 px-5 border-b-2 border-black"></td>
              </tr>
            </thead>
            <tbody>
              {researches.map((row, index) => {
                return (
                  <tr key={index}>
                    <td className="py-2 px-5">{index + 1}</td>
                    <td className="py-2 px-5">{row.id}</td>
                    <td className="py-2 px-5">{row.groupToken}</td>
                    <td className={`py-2 px-5 ${tokenExpired(row) ? 'text-red' : ''}`}>
                      { row.researchToken ? new Date(row.researchToken?.expiredAt).toLocaleString() : ''}
                    </td>
                    <td className="py-2 px-5 text-right">
                      {user?.role === UserRole.Respondent ? (
                      <button
                        disabled={tokenExpired(row)}
                        onClick={() => navigate(`/setup/${row.id}`)}
                        className="button button-md button-blue p-1 px-5 text-base"
                      >
                        Kerjakan Tes
                      </button>
                      ) : (
                      <button
                        disabled={tokenExpired(row)}
                        onClick={() => navigate(`./${row.id}`)}
                        className="button button-md button-blue p-1 px-5 text-base"
                      >
                        Detail
                      </button>
                      )}
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
