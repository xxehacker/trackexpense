import React from "react";
import { getUserFromStorage } from "@/utils/getUserFromStorage";
import { Navigate } from "react-router-dom";

function AuthChecker({ children }) {
  const user = getUserFromStorage();

  if (user) {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
}

export default AuthChecker;
