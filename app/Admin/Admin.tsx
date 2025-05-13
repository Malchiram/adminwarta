// app/admin/page.tsx
"use client"
import AddContent from "@/components/Admin/AddContent";
import AdminPanel from "@/components/Admin/AdminPanel";
import { RootState } from "@/lib/store/store";
import { useMemo } from "react";
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
  
  return (
<AdminLayout>
{handleMenu}
</AdminLayout>
  )
};

export default AdminPage;
