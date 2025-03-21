import { Header } from 'antd/es/layout/layout'
import React from 'react'
import { UserOutlined } from '@ant-design/icons';
import { Avatar} from 'antd';
const AppHeader = () => {
  return (
    <Header className='bg-custom sticky  z-10 top-0 shadow-lg flex items-center   !p-0 !pr-5 gap-3 justify-end !text-white'>
            <Avatar icon={<UserOutlined />} />
        <div className="">Avatar</div>
    </Header>
  )
}

export default AppHeader