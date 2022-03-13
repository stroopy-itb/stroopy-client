import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import researchTokenMiddleware from "../../redux/middleware/ResearchTokenMiddleware";
import { AppDispatch, RootState } from "../../redux/store";

export default function TokenList(): JSX.Element {
  const researchTokens = useSelector(
    (state: RootState) => state.researchToken.researchTokens
  );

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(researchTokenMiddleware.getAll());
  });

  return (
    <div className="flex-grow p-10 grid grid-flow-row gap-10 justify-items-center content-start">
      <h1 className="text-4xl font-bold text-white">Token Penelitian</h1>
      <div className="justify-self-stretch bg-white rounded-2xl">
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
                      <button className="button button-action p-1 px-5 text-base">
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
        <button className="button button-action py-3 bg-green">
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
    </div>
  );
}
