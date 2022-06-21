import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "./UseAuth";

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const auth = useAuth();
  const router = useRouter();
  useEffect(() => {
    setLoading(true);
    if (!auth.isLogedIn) {
      if (router.pathname === '/forgot') {
        router.push("/forgot");
      }
      if (router.pathname != '/forgot') {
        router.push("/login");
      }
    }
    setLoading(false);
  });
  return (
    <>
      {!loading ? (
        children
      ) : (
        <>
          <div
            className="w-100 d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
          >
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default RequireAuth;
