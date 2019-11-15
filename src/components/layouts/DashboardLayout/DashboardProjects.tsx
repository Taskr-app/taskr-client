import React from 'react';
import { useGetUserProjectsQuery, Project } from '../../../generated/graphql';
import { encode } from '../../../lib/hashids';
import { useHistory } from 'react-router';

const DashboardProjects: React.FC = () => {
  const history = useHistory();
  const { data } = useGetUserProjectsQuery();

  const handleClick = (project: Pick<Project, 'id' | 'name'>) => () => {
    history.push({
      pathname: `/project/${encode(project.id)}/${project.name}`
    });
  };
  return (
    <div>
      {data!.getUserProjects.map(project => {
        return (
          <div
            style={{ cursor: 'pointer' }}
            key={project.id}
            onClick={handleClick(project)}
          >
            {project.name}
          </div>
        );
      })}
    </div>
  );
};

export default DashboardProjects;
