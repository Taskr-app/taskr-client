import React from 'react';
import { Avatar, Dropdown, Icon, Menu } from 'antd';
import { useModal } from '../../modals';
import CreateProjectModal from '../../modals/CreateProjectModal';
import CreateTeamModal from '../../modals/CreateTeamModal';

const CreateIcon: React.FC = () => {
  const { showModal } = useModal()

  const handleCreateProject = () => {
    showModal(<CreateProjectModal />)
  }

  const handleCreateTeam = () => {
    showModal(<CreateTeamModal />)
  }

  const menu = (
    <Menu>
      <Menu.Item onClick={handleCreateProject}>
        <span>
          <Icon type='project' />
          <span>Create Project</span>
        </span>
      </Menu.Item>

      <Menu.Item onClick={handleCreateTeam}>
        <span>
          <Icon type='team' />
          <span>Create Team</span>
        </span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement={'bottomCenter'}>
      <Avatar
        icon={<Icon type='plus-square' theme='twoTone' />}
        style={{ backgroundColor: 'transparent', color: 'rgba(0, 0, 0, 0.65)', cursor: 'pointer' }}
      />
    </Dropdown>
  );
};

export default CreateIcon;
