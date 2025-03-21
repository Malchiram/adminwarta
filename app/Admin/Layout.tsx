// app/admin/layout.tsx
"use client"; // Menandakan file ini berjalan di sisi klien
import { Layout, Menu } from "antd";
import AppHeader from "@/components/AppHeader";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { MenuItemType } from "antd/es/menu/interface";
import { handleMenu } from "@/lib/slice/menuSlice";
import Sidebar, { LabelData } from "./sidebar";
import {
  AppstoreAddOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { logout } from "@/lib/slice/authSlice";
import { RootState } from "@/lib/store/store";
import { LogoutUser } from "@/lib/api/auth";
// import { PostData } from "@/lib/api/auth";
const { Content } = Layout;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {isMenuActive} = useSelector((state : RootState) => state.menu )

  const dispatch = useDispatch();
  const itemsMenu = useMemo(
    (): MenuItemType[] => [
      {
        key: 1,
        label: <LabelData icon={<UserOutlined />} title="Table" />,
        onClick: () => {
          dispatch(handleMenu(1)); // Logout user
        },
      },
      {
        key: 2,
        label: (
          <LabelData
            icon={<AppstoreAddOutlined size={80} />}
            title="Add Content"
          />
        ),
        onClick: () => {
          dispatch(handleMenu(2)); // Logout user
        },
      },
      {
        key: 3,
        label: <LabelData icon={<LogoutOutlined />} title="Logout" />,
        onClick: async () => {
          try {
            const data = await LogoutUser()
            console.log(data , 'ini data')
            if(data.status === 200) {

              dispatch(logout()); // Logout user
            }
            
          } catch (error) {
console.log(error)            
          }
        },
      },
    ],
    [dispatch]
  );
  return (
    <Layout className="!h-full">
          <Sidebar />
    <Layout  className=" !h-full ">
      <AppHeader />
      <Content  className="  bg-content !h-full !overflow-scroll pt-5">
        {children} 
      </Content>
      <div className="menubar min-md:hidden">
        <Menu
          mode="horizontal"
          // theme="dark"
          defaultSelectedKeys={[String(isMenuActive)]}
          className=" bg-custom    z-20  "
          items={itemsMenu}
          selectedKeys={[String(isMenuActive)]}

        />
      </div>
    </Layout>
    </Layout>
  );
}
