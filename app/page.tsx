"use client";
import { RootState } from "@/lib/store/store";
import { useSelector } from "react-redux";
import AdminPage from "./Admin/Admin";
import LoginPage from "./Login/LoginPage";
import { useEffect, useState } from "react";

const Page = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const isLoggedIn = JSON.parse(localStorage.getItem('authenticated') || 'false')
  setLoggedIn(isLoggedIn)
    },[isAuthenticated])
  return loggedIn ? <AdminPage /> : <LoginPage />;
};

export default Page;
