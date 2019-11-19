import React from "react";
import { useGetUserProjectsQuery, Project } from "../../../generated/graphql";
import { encode } from "../../../lib/hashids";
import { useHistory } from "react-router";

import styles from "./DashboardLayout.module.scss";
import { Icon, Tooltip } from "antd";
import { DefaultUserAvatar } from "../../common/Avatar";

const DashboardProjects: React.FC = () => {
  const history = useHistory();
  const { data } = useGetUserProjectsQuery();

  const handleClick = (project: Pick<Project, "id" | "name">) => () => {
    history.push({
      pathname: `/project/${encode(project.id)}/${project.name}`
    });
  };

  return (
    <div>
      {data!.getUserProjects.map(project => {
        return (
          <div
            style={{ cursor: "pointer" }}
            key={project.id}
            onClick={handleClick(project)}
            className={styles.project}
          >
            <div className={styles.left}>
              <div className={styles.projectIcon}>
                <Icon type="appstore" style={{ fontSize: "16px" }} />
              </div>
              <div>
                <p className={styles.name}>{project.name}</p>
                <p className={styles.desc}>{project.desc}</p>
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.usersContainer}>
                <Tooltip title={project.owner.email}>
                  <div>
                    <DefaultUserAvatar user={project.owner} />
                  </div>
                </Tooltip>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardProjects;
