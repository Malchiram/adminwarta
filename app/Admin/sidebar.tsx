"use client"; 
import { LogoutUser } from "@/lib/api/auth";
import { logout } from "@/lib/slice/authSlice";
import { handleMenu } from "@/lib/slice/menuSlice";
import { RootState } from "@/lib/store/store";
import {
  AppstoreAddOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { MenuItemType } from "antd/es/menu/interface";
import { ReactNode, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

const { Header, Sider } = Layout;

export const LabelData = ({ title, icon }: { title: string; icon: ReactNode }) => {
  return (
    <div className="flex max-md:justify-center items-center   gap-3 h-full ">
      {icon}
      <span className="max-sm:hidden min-md:text-lg">{title}</span>
    </div>
  );
};

export default function Sidebar() {
  const {isMenuActive} = useSelector((state : RootState) => state.menu )

    const dispatch = useDispatch()
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
    <>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        className="max-md:hidden "
      >
        <Header className="" style={{ padding: 0 }}>
          <div className="w-full h-full flex items-center justify-center text-white text-xl">
            <span>GPdI Shekinah</span>
          </div>
        </Header>

        <Menu
          mode="inline"
          theme="dark"
          defaultSelectedKeys={[String(isMenuActive)]}
          selectedKeys={[String(isMenuActive)]}
          style={{ height: "100%", borderRight: 0 }}
          items={itemsMenu}
        />
      </Sider>

      {/* Bottom menu untuk mobile */}
      {/* <div className="menubar min-md:hidden">
        <Menu
          mode="horizontal"
          // theme="dark"
          defaultSelectedKeys={["1"]}
          className=" bg-custom fixed bottom-0   z-20  "
          items={itemsMenu}
        />
      </div> */}
    </>
  );
}
