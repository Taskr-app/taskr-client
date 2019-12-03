import React, { useCallback } from 'react';
import { User } from '../../../generated/graphql';
import { Avatar } from 'antd';

type PartialExceptFor<T, TRequired extends keyof T> = Partial<T> &
  Pick<T, TRequired>;
type PartialUser = PartialExceptFor<User, 'username' | 'id'>;
interface DefaultUserAvatarProps {
  user: PartialUser;
  style?: React.CSSProperties;
}

export const DefaultUserAvatar: React.FC<DefaultUserAvatarProps> = ({
  user,
  ...style
}) => {
  const letterToColor = useCallback(() => {
    const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
    const letter = user.username[0].toUpperCase();
    return colorList[Math.floor((letter.toUpperCase().charCodeAt(0) - 64) / 6)];
  }, [user.username]);

  return (
    <Avatar style={{ backgroundColor: letterToColor(), ...style }}>
      {user.username[0].toUpperCase()}
    </Avatar>
  );
};
