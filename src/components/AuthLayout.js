import React from "react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth.isLogged);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (authentication && authState !== authentication) {
      navigate("/login");
    } else if (!authentication && authState !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [authState,navigate, authentication]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}
