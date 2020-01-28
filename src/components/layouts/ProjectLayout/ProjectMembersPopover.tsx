import React, { useEffect, useState, useCallback } from 'react';
import styles from './ProjectLayout.module.scss';
import {
  useGetProjectInvitesQuery,
  GetUserProjectQuery,
  OnSendProjectInviteDocument,
  OnSendProjectInviteSubscription,
  User,
  InvitedUserResponse
} from '../../../generated/graphql';
import { SubText } from '../../common/Text';
import { UserAvatar } from '../../common/Avatar';
import { Icon, Spin, Input } from 'antd';
import { SmallTooltip } from '../../common/Tooltip';

interface Props {
  project: GetUserProjectQuery;
}

export type SearchUsers = ({
  __typename?: 'User' | undefined;
} & {
  __typename?: 'User' | undefined;
} & Pick<User, 'id' | 'email' | 'username' | 'avatar' | 'auth'>)[];

export type SearchInvites = ({
  __typename?: 'InvitedUserResponse' | undefined;
} & Pick<InvitedUserResponse, 'email' | 'avatar'>)[];

const ProjectMembersPopover: React.FC<Props> = ({ project }) => {
  const { owner, members, id } = project.getUserProject;
  const [search, handleSearch] = useState<string>('');

  const { data, loading, subscribeToMore } = useGetProjectInvitesQuery({
    variables: {
      projectId: id.toString()
    }
  });

  const subscribeToProjectInvites = () => {
    subscribeToMore({
      document: OnSendProjectInviteDocument,
      variables: { projectId: id.toString() },
      updateQuery: (prev, { subscriptionData }: any) => {
        const res = (subscriptionData.data as OnSendProjectInviteSubscription)
          .onSendProjectInvite;
        return {
          ...prev,
          getProjectInvites: [...prev.getProjectInvites, res]
        };
      }
    });
  };

  useEffect(() => {
    subscribeToProjectInvites();
  }, []);

  const filterUsers = useCallback(
    (users: SearchUsers) => {
      return users.filter(user => {
        return (
          user.email.includes(search) ||
          (user.username && user.username.includes(search))
        );
      });
    },
    [search]
  );

  const filterInvites = useCallback(
    (users: SearchInvites) => {
      return users.filter(user => user.email.includes(search));
    },
    [search]
  );

  const renderOwner = () => {
    const [filteredOwner] = filterUsers([owner]);
    if (!filteredOwner) return null;
    return (
      <>
        <SubText>Owner</SubText>
        <div className={styles.subList}>
          <SmallTooltip
            title={
              <span>
                {filteredOwner.username} (<em>{filteredOwner.email}</em>)
              </span>
            }
            placement='bottom'
            key={filteredOwner.id}
          >
            <div className={styles.memberContainer}>
              <UserAvatar user={filteredOwner} size='small' />
            </div>
          </SmallTooltip>
        </div>
      </>
    );
  };

  const renderMembers = () => {
    const filteredMembers = filterUsers(members);
    if (!filteredMembers || !filteredMembers.length) return null;
    return (
      <>
        <SubText>Members</SubText>
        <div className={styles.subList}>
          {filteredMembers.map(user => (
            <SmallTooltip
              title={
                <span>
                  {user.username} (<em>{user.email}</em>)
                </span>
              }
              placement='bottom'
              key={user.id}
            >
              <div className={styles.memberContainer}>
                {user.id === owner.id && (
                  <Icon
                    type='crown'
                    theme='twoTone'
                    twoToneColor='#F5BB00'
                    className={styles.ownerIcon}
                  />
                )}
                <UserAvatar user={user} size='small' />
              </div>
            </SmallTooltip>
          ))}
        </div>
      </>
    );
  };

  const renderInvites = () => {
    if (loading) return <Spin />;
    if (!data || !data.getProjectInvites.length) return null;
    const filteredInvites = filterInvites(data.getProjectInvites);
    return (
      <>
        <SubText>Invites</SubText>
        <div className={styles.subList}>
          {filteredInvites.map((user: InvitedUserResponse) => (
            <SmallTooltip
              title={<span>{user.email}</span>}
              placement='bottom'
              key={`etc-invites-${user.email}`}
            >
              <div className={styles.memberContainer}>
                <UserAvatar
                  key={`etc-invites-${user.email}`}
                  size='small'
                  user={{
                    username: user.email,
                    avatar: user.avatar,
                    id: `etc-invites-${user.email}`
                  }}
                />
              </div>
            </SmallTooltip>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className={styles.projectMembersListContainer}>
      <header className={styles.membersHeader}>Project Members</header>

      <div className={styles.membersContent}>
        <Input.Search
          style={{ margin: '6px 0 12px' }}
          onSearch={(value: string) => {
            if (value.length >= 3) handleSearch(value);
            if (value.length === 0) handleSearch(value)
          }}
          placeholder='Email address or name'
        />
        {renderOwner()}
        {renderMembers()}
        {renderInvites()}
      </div>
    </div>
  );
};

export default ProjectMembersPopover;
