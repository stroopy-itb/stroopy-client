import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading, ResearchTable } from "../../component";
import researchMiddleware from "../../redux/middleware/ResearchMiddleware";
import { AppDispatch, RootState } from "../../redux/store";

export default function AdminResearchList(): JSX.Element {
  const researches = useSelector(
    (state: RootState) => state.research.researches
  );
  const user = useSelector((state: RootState) => state.user.user);

  const sizeState = useSelector((state: RootState) => state.research.size);
  const pageState = useSelector((state: RootState) => state.research.page);
  const totalSize = useSelector((state: RootState) => state.research.totalSize);

  const [size] = useState(sizeState);
  const [page, setPage] = useState(pageState);

  const changePage = (event: any) => {
    setPage(Number(event.selected + 1));
  };

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(researchMiddleware.getAll({ size: size, page: page, filter: {} }));
  }, [size, page, dispatch]);

  return (
    <div className="flex-grow p-4 lg:p-6 grid grid-flow-row gap-4 lg:gap-10 justify-items-center content-start">
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
    </div>
  );
}
