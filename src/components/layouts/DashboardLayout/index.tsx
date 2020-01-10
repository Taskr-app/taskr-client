import React from 'react';
import { useGetUserTeamsQuery, Team } from '../../../generated/graphql';
import { Menu  } from 'antd';
import Layout from '../Layout';
import { encode } from '../../../lib/hashids';
import { useHistory } from 'react-router';
import SideMenuItem from '../../common/Menu/SideMenuItem';

const DashboardLayout: React.FC = ({ children }) => {
  const history = useHistory();
  const { data: teamData, loading: teamLoading } = useGetUserTeamsQuery();

  const handleTeamClick = (team: Pick<Team, 'id' | 'name'>) => () => {
    history.push({ pathname: `/team/${encode(team.id)}/${team.name}` });
  };

  const handleProjectsClick = () => {
    history.push({ pathname: '/' });
  };

  return (
    <Layout
      title='Taskr'
      sider={
        <>
          <Menu style={{ height: '100%' }} mode='inline' selectable={false}>
            <Menu.Item key='projects' onClick={handleProjectsClick}>
              <SideMenuItem label='Projects' icon='project' />
            </Menu.Item>

            <Menu.Item key='tasks'>
              <SideMenuItem icon='code' label='My Tasks' />
            </Menu.Item>
            <Menu.SubMenu
              key='teams'
              title={<SideMenuItem icon='team' label='Teams' />}
            >
              {teamLoading || !teamData ? (
                <div />
              ) : (
                teamData.getUserTeams.map(team => (
                  <Menu.Item
                    key={`team-${team.id}`}
                    onClick={handleTeamClick(team)}
                  >
                    {team.name}
                  </Menu.Item>
                ))
              )}
            </Menu.SubMenu>
          </Menu>
        </>
      }
    >
      {children}
    </Layout>
  );
};

export default DashboardLayout;
