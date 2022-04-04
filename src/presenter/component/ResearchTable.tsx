import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Research } from "../../domain/model";

export default function ResearchTable(props: {
  researches?: Research[];
}): JSX.Element {
  const { researches } = props;

  const navigate = useNavigate();

  return (
    <div className="justify-self-stretch bg-white rounded-2xl overflow-auto md:p-5">
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
                      onClick={() => navigate(`./${row.id}`)}
                      className="button button-action p-1 px-5 text-base"
                    >
                      Detail
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
  );
}
