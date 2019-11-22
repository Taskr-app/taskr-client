import React, { useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import {
  useSendTeamInviteLinkMutation,
  useGetUserTeamQuery,
  useUpdateTeamMutation,
  GetUserTeamDocument,
  useDeleteTeamProjectMutation,
  useDeleteTeamMemberMutation
} from "../../generated/graphql";
import { Button, Input, message, Skeleton } from "antd";
import { errorMessage } from "../../lib/messageHandler";
import { useParams, useHistory, useLocation } from "react-router";
import styles from "./Team.module.scss";
import { Link } from "react-router-dom";
import { encode, decode } from '../../lib/hashids';

interface RouteParams {
  teamId: string;
  teamName: string;
}

const TeamPage: React.FC = () => {
  const params = useParams<RouteParams>()
  const [val, setValue] = useState("");
  const history = useHistory();

  // Update Team Name
  const [localName, setName] = useState({teamName: ""});       // Local state teamName to update input tag value.
  const [updateName] = useUpdateTeamMutation({     
    refetchQueries: [{                // Used refetchQueries!
      query: GetUserTeamDocument,
      variables: {id: decode(params.teamId)}
    }],
    onCompleted: (completedData) => {
      history.push({
        pathname: `/team/${encode(completedData.updateTeam.id)}/${completedData.updateTeam.name}`
      })
    }
  });

  const { data, loading, error } = useGetUserTeamQuery({
    variables: {
      id: decode(params.teamId)
    }
  });

  // console.log(data && data);

  const [sendTeamInviteLink] = useSendTeamInviteLinkMutation({
    onCompleted: () => {
      message.success(`A team invitation has been sent to ${val}`);
    },
    onError: err => errorMessage(err)
  });

  const handleInviteMember = async () => {
    await sendTeamInviteLink({
      variables: {
        teamId: decode(params.teamId),
        email: val
      }
    });
  };

// Delete Project
  const [deleteProject] = useDeleteTeamProjectMutation({
    onCompleted: (deleteData) => {
      history.push({
        pathname: `/project/${encode(deleteData.deleteTeamProject.id)}/${deleteData.deleteTeamProject.name}`
      })
    },
    refetchQueries: [{                // Used refetchQueries!
      query: GetUserTeamDocument,
      variables: {id: decode(params.teamId)}
    }],
    onError: err => errorMessage(err)
  });
  const handleDeleteProject = (e:React.SyntheticEvent) => {
    e.preventDefault();
    deleteProject({
      variables: {
        teamId: decode(params.teamId),
        projectId: e.currentTarget.id
      }
    })
  }

// // Delete Team Member               
const [deleteMember] = useDeleteTeamMemberMutation({
  refetchQueries: [{                 // Used refetchQueries!
    query: GetUserTeamDocument,
    variables: {id: decode(params.teamId)}
  }],
  onError: err => errorMessage(err)
})

const handleDeleteMember = (e:React.SyntheticEvent) => {
    e.preventDefault();
    deleteMember({
      variables: {
        teamId: decode(params.teamId),
        userId: e.currentTarget.id
      }
    })
  }


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
              <div 
                className={styles.projectName} 
                id={`${project.id}`} 
                onClick={() => {
                  history.push(`/project/${encode(project.id)}/${project.name}`)
                }}
              >{project.name}</div>
              <Button onClick={handleDeleteProject} id={`${project.id}`}>Delete Project</Button>
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
              <Button onClick={handleDeleteMember} id={`${member.id}`}>Delete Member</Button>
            </li>
          ))}
        </ul>
      )
    }
  }

  // Update Team Name
  const updateLocalName = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setName(prevName => ({...prevName, [name]: value}))
  }

  const handleSubmit = (e:React.SyntheticEvent) => {
    e.preventDefault();
    updateName({
      variables: {
        teamId: decode(params.teamId),
        name: localName.teamName
      }
    })
  };


  // TEST
  // console.log(data.getUserTeam.members)

  // console.log(data && data.getUserTeam.members);
  // console.log(GetUserTeamDocument);
  // console.log('HI');
  
  return (
    <DashboardLayout>
      <h1>{renderTeamName()}</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Team Name" value={localName.teamName} id="teamName" name="teamName" onChange={updateLocalName}/>
        <button>edit</button>
      </form>
      <div>{renderTeamMembers()}</div>
      <div>{renderProjects()}</div>
      <Input value={val} onChange={e => setValue(e.currentTarget.value)} />
      <Button onClick={handleInviteMember}>Invite member</Button>
    </DashboardLayout>
  );
};

export default TeamPage;
