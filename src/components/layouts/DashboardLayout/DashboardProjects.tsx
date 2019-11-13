import React from "react";
import { useGetUserProjectsQuery } from "../../../generated/graphql";
import { encode } from "../../../lib/hashids";
import { useHistory } from "react-router";

const DashboardProjects: React.FC = () => {
  const history = useHistory();
  const { data } = useGetUserProjectsQuery();

  const handleClick = (id: string | number) => () => {
    history.push({
      pathname: `/project/${encode(id)}`
    });
  };
  return (
    <div>
      {data!.getUserProjects.map(project => {
        return (
          <div
            style={{ cursor: "pointer" }}
            key={project.id}
            onClick={handleClick(project.id)}
          >
            {project.name}
          </div>
        );
      })}
    </div>
  );
};

export default DashboardProjects;
