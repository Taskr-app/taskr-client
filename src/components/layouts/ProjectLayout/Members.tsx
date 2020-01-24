import React from 'react';
import styles from './ProjectLayout.module.scss';
import { Avatar, Popover } from 'antd';
import { SmallTooltip } from '../../common/Tooltip';
import { UserAvatar } from '../../common/Avatar';
import {
  GetUserProjectQuery,
} from '../../../generated/graphql';
import ProjectMembersPopover from './ProjectMembersPopover';

interface Props {
  project: GetUserProjectQuery;
}

const Members: React.FC<Props> = ({ project }) => {
  const { members } = project.getUserProject;

  return (
    <div className={styles.avatarContainer}>
      <Popover
        trigger='click'
        content={<ProjectMembersPopover project={project} />}
        placement='bottom'
      >
        <div className={styles.etcMembers}>
          <Avatar className={styles.allMembersAvatar}>
            {members.length > 5 ? `+${members.length - 5}` : '...'}
          </Avatar>
        </div>
      </Popover>

      {members
        .slice(0, 5)
        .reverse()
        .map(user => {
          return (
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
                <UserAvatar
                  user={user}
                  style={{
                    width: '28px',
                    height: '28px',
                    lineHeight: '28px'
                  }}
                />
              </div>
            </SmallTooltip>
          );
        })}
    </div>
  );
};

export default Members;
