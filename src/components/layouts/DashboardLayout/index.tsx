import React from "react";
import { useGetUserTeamsQuery, Team } from "../../../generated/graphql";
import { Menu, Icon } from "antd";
import Layout from "../Layout";
import { encode } from "../../../lib/hashids";
import { useHistory } from "react-router";

import styles from "./DashboardLayout.module.scss";

const DashboardLayout: React.FC = ({ children }) => {
  const history = useHistory();
  const { data: teamData, loading: teamLoading } = useGetUserTeamsQuery();

  const handleTeamClick = (team: Pick<Team, "id" | "name">) => () => {
    history.push({ pathname: `/team/${encode(team.id)}/${team.name}` });
  };

  return (
    <Layout
      title="Taskr"
      sider={
        <>
          <Menu
            style={{ height: "100%" }}
            mode="inline"
            selectable={false}
          >
            <Menu.Item key="projects">
              <span className={styles.menuItem}>
                <Icon type="project" style={{ color: "#8491A3" }} />
                <span className={styles.text}>Projects</span>
              </span>
            </Menu.Item>
            <Menu.Item key="tasks">
              <span className={styles.menuItem}>
                <Icon type="code" style={{ color: "#8491A3" }} />
                <span className={styles.text}>My Tasks</span>
              </span>
            </Menu.Item>
            <Menu.SubMenu
              key="teams"
              title={
                <span className={styles.menuItem}>
                  <Icon type="team" style={{ color: "#8491A3" }} />
                  <span className={styles.text}>Teams</span>
                </span>
              }
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
