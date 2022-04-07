import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Header, ProtectedRoute } from "./presenter/component";
import {
  Home,
  Login,
  Register,
  AdminRoot,
  TokenList,
  AdminResearchList,
  ResearcherRoot,
  ResearchList,
  ResearchDetail,
  AdminResearchDetail,
  RespondentResearchList,
  RespondentResearchDetail,
} from "./presenter/page";
import { History, Setup, Stroop, Result } from "./presenter/page/respondent";
import { authMiddleware } from "./presenter/redux/middleware";
import { AppDispatch, RootState } from "./presenter/redux/store";

function App() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const authError = useSelector(
    (state: RootState) => state.auth.error
  );
  const userError = useSelector(
    (state: RootState) => state.user.error
  );
  const researchTokenError = useSelector(
    (state: RootState) => state.researchToken.error
  );
  const researchError = useSelector(
    (state: RootState) => state.research.error
  );
  const testResultError = useSelector(
    (state: RootState) => state.testResult.error
  );

  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigate = useNavigate();

  const [prevPath] = useState(location.pathname);
  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(authMiddleware.reauth()).then(() => {
        navigate(prevPath);
      });
    }
  }, [isAuthenticated]);
  useEffect(() => {
    if (authError) {
      toast.error(`${authError.message}`);
    }
  }, [authError]);

  return (
    <div className="bg-black px-10 min-h-screen flex flex-col justify-start items-stretch">
      <Header />
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute children={<Home />} />} />
          <Route
            path="history"
            element={<ProtectedRoute children={<History />} />}
          />
          <Route
            path="research"
            element={<ProtectedRoute children={<RespondentResearchList />} />}
          />
          <Route
            path="research/:id"
            element={<ProtectedRoute children={<RespondentResearchDetail />} />}
          ></Route>
          <Route path="setup/:researchId" element={<Setup />} />
          <Route
            path="test/:researchId"
            element={<ProtectedRoute children={<Stroop />} />}
          />
          <Route
            path="result/:researchId"
            element={<ProtectedRoute children={<Result />} />}
          />
          <Route
            path="admin"
            element={<ProtectedRoute children={<AdminRoot />} />}
          >
            <Route path="research-token" element={<TokenList />} />
            <Route path="research" element={<AdminResearchList />} />
            <Route path="research/:id" element={<AdminResearchDetail />} />
          </Route>
          <Route
            path="researcher"
            element={<ProtectedRoute children={<ResearcherRoot />} />}
          >
            <Route path="research" element={<ResearchList />} />
            <Route path="research/:id" element={<ResearchDetail />} />
          </Route>
        </Routes>
        <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default App;
