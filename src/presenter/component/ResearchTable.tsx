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
      <div className="bg-white rounded-2xl overflow-auto md:p-5">
        {researches ? (
          <table className="table-auto w-full">
            <thead>
              <tr className="font-bold">
                <td className="py-2 px-5 border-b-2 border-black">NO.</td>
                <td className="py-2 px-5 border-b-2 border-black">ID</td>
                <td className="py-2 px-5 border-b-2 border-black">Token</td>
                <td className="py-2 px-5 border-b-2 border-black">Dibuat</td>
                <td className="py-2 px-5 border-b-2 border-black">Diupdate</td>
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
                    <td className="py-2 px-5">
                      {new Date(row.createdAt).toLocaleString()}
                    </td>
                    <td className="py-2 px-5">
                      {new Date(row.updatedAt).toLocaleString()}
                    </td>
                    <td className="py-2 px-5 text-right">
                      <button
                        onClick={() => navigate(`${user?.role === UserRole.Respondent ? "/setup/" : "./"}${row.id}`)}
                        className="button button-action p-1 px-5 text-base"
                      >
                        { user?.role === UserRole.Respondent ? "Kerjakan Tes" : "Detail" }
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
