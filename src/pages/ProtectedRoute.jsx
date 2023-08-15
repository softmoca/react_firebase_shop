import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children, requireAdmin }) {
  // 로그인한 사용자인지, 그 사용자가 어드민 권한이 있는지확인
  //required  가 true 인 경우에는 로그인,어드민 둘다 가지고 있어야함
  // 위 조건에 안맞으면 / 루트 경로로 이동
  //조건에 맞으면 childern 보여줌

  const { user } = useAuthContext();

  if (!user || (requireAdmin && !user.isAdmin)) {
    return <Navigate to="/" replace />;
  }

  return children; // ProtectedRoute 컴포넌트 사이에 있는 요소들
}
