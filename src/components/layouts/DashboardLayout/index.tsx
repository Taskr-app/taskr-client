import React from 'react';
import { useModal } from "../../modals";
import { useGetUserTeamsQuery, useGetUserProjectsQuery, Project, Team } from "../../../generated/graphql";
import { Menu, Icon } from "antd";
import { MenuItemIcon } from "../../common/Menu";
import Layout from "../Layout";
import { encode } from "../../../lib/hashids";
import { useHistory } from "react-router";

const DashboardLayout: React.FC = ({ children }) => {
  const history = useHistory();
  const { showModal } = useModal();
  const { data: teamData, loading: teamLoading } = useGetUserTeamsQuery();
  const { data: projectData, loading: projectLoading } = useGetUserProjectsQuery();
  const showCreateTeamModal = () => showModal("createTeam");
  const showCreateProjectModal = () => showModal("createProject")

  const handleProjectClick = (project: Pick<Project, "id" | "name">) => () => {
    history.push({ pathname: `/project/${encode(project.id)}/${project.name}` })
  }
  const handleTeamClick = (team: Pick<Team, "id" | "name">) => () => {
    history.push({ pathname: `/team/${encode(team.id)}/${team.name}` })
  }

  return (
    <Layout
      title="Taskr"
      sider={
        <>
          <Menu
            style={{ height: "100%" }}
            mode="inline"
            defaultOpenKeys={["projects", "teams"]}
          >
            <Menu.SubMenu
              key="projects"
              title={
                <span>
                  <Icon type="project" />
                  <span>Projects</span>
                </span>
              }
            >
              {
                projectLoading || !projectData ? (
                  <div />
                ) : (
                  projectData.getUserProjects.map((project) => (
                    <Menu.Item key={`project-${project.id}`} onClick={handleProjectClick(project)}>
                      {project.name}
                    </Menu.Item>
                  ))
                )
              }
            </Menu.SubMenu>
            <Menu.SubMenu
              key="teams"
              title={
                <span>
                  <Icon type="team" />
                  <span>Teams</span>
                </span>
              }
            >
              {teamLoading || !teamData ? (
                <div />
              ) : (
                teamData.getUserTeams.map(team => (
                  <Menu.Item key={`team-${team.id}`} onClick={handleTeamClick(team)}>
                    {team.name}
                  </Menu.Item>
                ))
              )}
            </Menu.SubMenu>
            <Menu.Divider />
            <Menu selectable={false} style={{ borderRight: 'none', paddingTop: '20px' }}>
              <MenuItemIcon
                label="Create Project"
                iconType="plus-square"
                leftIcon="project"
                onClick={showCreateProjectModal}
              />
              <MenuItemIcon
                label="Create Team"
                iconType="plus-square"
                leftIcon="team"
                onClick={showCreateTeamModal}
              />
            </Menu>
          </Menu>
        </>
      }
    >
     {children}
    </Layout>
  );
};

export default DashboardLayout;
