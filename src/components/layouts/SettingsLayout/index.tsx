import React from 'react';
import Layout from '../Layout';
import { Menu } from 'antd';
import SideMenuItem from '../../common/Menu/SideMenuItem';

const SettingsLayout: React.FC = ({ children }) => {
  const handleAccountClick = () => {};

  return (
    <Layout
      title='Settings'
      sider={
        <>
          <Menu style={{ height: '100%' }} mode='inline' selectable={false}>
            <Menu.Item key='account' onClick={handleAccountClick}>
              <SideMenuItem label='Account' icon='user' />
            </Menu.Item>
          </Menu>
        </>
      }
    >
      {children}
    </Layout>
  );
};

export default SettingsLayout;
