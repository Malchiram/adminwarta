"use client";
import { RootState } from "@/lib/store/store";
import { useSelector } from "react-redux";
import AdminPage from "./Admin/Admin";
import LoginPage from "./Login/LoginPage";
import { useEffect } from "react";

const Page = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  useEffect(() => {
     const accessToken = document.cookie.split('; ')
  console.log(accessToken , ' ini ada token');
  
    },[isAuthenticated])
  if (isAuthenticated) {
    return (
     

        <AdminPage />
    );
  } else {
    return <LoginPage />;
  }
};

export default Page;
