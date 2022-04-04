import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { Research } from "../../../domain/model";
import { ResearchForm, ResearchTable } from "../../component";
import researchMiddleware from "../../redux/middleware/ResearchMiddleware";
import { AppDispatch, RootState } from "../../redux/store";

export default function AdminResearchList(): JSX.Element {
  const researches = useSelector(
    (state: RootState) => state.research.researches
  );

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (!researches) dispatch(researchMiddleware.getAll());
  }, [researches]);

  return (
    <div className="flex-grow p-10 grid grid-flow-row gap-10 justify-items-center content-start">
      <h1 className="text-4xl font-bold text-white">Penelitian</h1>
      <ResearchTable researches={researches} />
      <div className="justify-self-stretch flex justify-between">
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
