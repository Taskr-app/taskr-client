import React, { useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import {
  useSendTeamInviteLinkMutation,
  useGetUserTeamQuery
} from "../../generated/graphql";
import { Button, Input, message, Skeleton } from "antd";
import { errorMessage } from "../../lib/messageHandler";
import { decode } from "../../lib/hashids";
import { useParams } from "react-router";
import styles from "./Team.module.scss";
import { Link } from "react-router-dom";

interface RouteParams {
  teamId: string;
  teamName: string;
}

const TeamPage: React.FC = () => {
  const params = useParams<RouteParams>()
  const [value, setValue] = useState("");
  const { data, loading } = useGetUserTeamQuery({
    variables: {
      id: decode(params.teamId)
    }
  });
  const [sendTeamInviteLink] = useSendTeamInviteLinkMutation({
    onCompleted: () => {
      message.success(`A team invitation has been sent to ${value}`);
    },
    onError: err => errorMessage(err)
  });

  const handleInviteMember = async () => {
    await sendTeamInviteLink({
      variables: {
        teamId: decode(params.teamId),
        email: value
      }
    });
  };

  if (!loading && !data) {
    return null;
  }
  if (loading || !data) {
    return (
      <DashboardLayout>
        <Skeleton active />
      </DashboardLayout>
    );
  }

  const renderProjects = () => {
    if (data) {
      return (
        <ul className={styles.projectList}>
          {data.getUserTeam.projects.map((project, idx) => (
            <li key={`team-project-${project.id}`}>
              <Link className={styles.projectName} to={`/project/${project.id}/${project.name}`}>{project.name}</Link>
            </li>
          ))}
        </ul>
      )
    }
  }

  const renderTeamName = () => {
    if (data) {
      return (
        <div className={styles.teamName}>
          {data.getUserTeam.name}          
        </div>
      )
    }
  }

  const renderTeamMembers = () => {
    if (data) {
      return (
        <ul className={styles.teamMembers}>
          {data.getUserTeam.members.map( (member, idx) => (
            <li key={`team-member-${member.id}`}>
              {member.username}
            </li>
          ))}
        </ul>
      )
    }
  }

  console.log(data && data.getUserTeam)
  return (
    <DashboardLayout>
      <h1>{renderTeamName()}</h1>
      <div>{renderTeamMembers()}</div>
      <div>{renderProjects()}</div>
      <Input value={value} onChange={e => setValue(e.currentTarget.value)} />
      <Button onClick={handleInviteMember}>Invite member</Button>
    </DashboardLayout>
  );
};

export default TeamPage;
