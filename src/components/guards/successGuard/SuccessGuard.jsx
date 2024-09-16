import { Navigate } from "react-router";

export default function SuccessGuard( {children} ) {
    const sessionId = localStorage.getItem("session_id");

    if (!sessionId) {
       
        return <Navigate to="/" />;
    }
  return (
    <>
      {children}
    </>
  );
}