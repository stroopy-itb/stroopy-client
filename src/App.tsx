import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { UserRole } from "./domain/model/UserRole";
import { Header, ProtectedRoute } from "./presenter/component";
import { Home, Login, Register, AdminRoot, TokenList, AdminResearchList, ResearcherRoot, ResearchList, ResearchDetail, AdminResearchDetail } from "./presenter/page";
import { History, Setup, Stroop, Result } from "./presenter/page/respondent";
import { authMiddleware, researchTokenMiddleware } from "./presenter/redux/middleware";
import { AppDispatch, RootState } from "./presenter/redux/store";

function App() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const user = useSelector(
    (state: RootState) => state.user.user
  );
  const researchersToken = useSelector(
    (state: RootState) => state.researchToken.researchersToken
  );

  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(authMiddleware.reauth()).then(() => {
        navigate(`${location.pathname}`);
      });
    }
    if (user?.role === UserRole.Researcher && !researchersToken) {
      dispatch(researchTokenMiddleware.getOneByResearcherId({ researcherId: user.id }))
    }
  }, [isAuthenticated]);

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
        <Route path="setup" element={<Setup />} />
        <Route path="test" element={<ProtectedRoute children={<Stroop />} />} />
        <Route
          path="result"
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
    </div>
  );
}

export default App;
