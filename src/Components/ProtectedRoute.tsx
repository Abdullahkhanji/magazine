import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }: any) => {
  const [user, setUser] = useState(false);
  const [render, setRender] = useState(false);

  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(true);
      }
      setRender(true);
    });
  }, []);
  if (!render) {
    return null;
  } else {
    if (!user) {
      return <Navigate to="/login" />;
    } else {
      console.log(user);
      return children;
    }
  }
};

export default ProtectedRoute;
