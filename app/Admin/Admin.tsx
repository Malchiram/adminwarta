// app/admin/page.tsx
"use client"
import AddContent from "@/components/Admin/AddContent";
import AdminPanel from "@/components/Admin/AdminPanel";
import { RootState } from "@/lib/store/store";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import AdminLayout from "./Layout";

const AdminPage = () => {
  const {isMenuActive} = useSelector((state : RootState) => state.menu )
  const handleMenu = useMemo(() => {
    switch (isMenuActive) {
      case 1:
        return <AdminPanel />
      case 2:
        return <AddContent />
    
      default:
        return <AdminPanel />
    }
  },[isMenuActive])
  useEffect(() => {
   const accessToken = document.cookie.split('; ')
console.log(accessToken , ' ini ada token');

  },[])
  return (
<AdminLayout>
{handleMenu}
</AdminLayout>
  )
};

export default AdminPage;
