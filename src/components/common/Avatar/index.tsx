import React, { useCallback, useState } from 'react';
import cn from 'classnames';
import styles from './Avatar.module.scss';
import { User } from '../../../generated/graphql';
import { Avatar } from 'antd';
import { cloudinary } from '../../../lib/cloudinary';
import { AvatarProps } from 'antd/lib/avatar';

export type PartialExceptFor<T, TRequired extends keyof T> = Partial<T> &
  Pick<T, TRequired>;
export type PartialUser = PartialExceptFor<User, 'username' | 'id'>;
interface UserAvatarProps {
  user: PartialUser;
  style?: React.CSSProperties;
}

export const UserAvatar: React.FC<UserAvatarProps & AvatarProps> = ({
  user,
  style,
  ...avatarProps
}) => {
  const [imageError, handleImageError] = useState<boolean>(false);
  const letterToColor = useCallback(() => {
    const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
    const letter = user.username[0].toUpperCase();
    return colorList[Math.floor((letter.toUpperCase().charCodeAt(0) - 64) / 6)];
  }, [user.username]);

  const avatarStyle = cn(styles.avatar, {
    [styles.orange]: letterToColor() === '#f56a00',
    [styles.purple]: letterToColor() === '#7265e6',
    [styles.yellow]: letterToColor() === '#ffbf00',
    [styles.teal]: letterToColor() === '#00a2ae'
  });

  if (user.avatar && !imageError) {
    const imageSource = cloudinary.url(user.avatar, {
      height: 50,
      width: 50,
      radius: 'max',
      gravity: 'face'
    });

    const toggleImageError = () => handleImageError(true);

    return (
      <Avatar
        className={avatarStyle}
        style={{ ...style }}
        icon={<img src={imageSource} alt='' onError={toggleImageError} />}
        {...avatarProps}
      />
    );
  }

  return (
    <Avatar className={avatarStyle} style={{ ...style }} {...avatarProps}>
      {user.username[0].toUpperCase()}
    </Avatar>
  );
};
