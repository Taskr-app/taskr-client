import React, { useCallback, useState } from 'react';
import { User } from '../../../generated/graphql';
import { Avatar } from 'antd';
import { cloudinary } from '../../../lib/cloudinary';

type PartialExceptFor<T, TRequired extends keyof T> = Partial<T> &
  Pick<T, TRequired>;
type PartialUser = PartialExceptFor<User, 'username' | 'id'>;
interface UserAvatarProps {
  user: PartialUser;
  style?: React.CSSProperties;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ user, ...style }) => {
  const [imageError, handleImageError] = useState<boolean>(false)
  const letterToColor = useCallback(() => {
    const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
    const letter = user.username[0].toUpperCase();
    return colorList[Math.floor((letter.toUpperCase().charCodeAt(0) - 64) / 6)];
  }, [user.username]);

  if (user.avatar && !imageError) {
    const imageSource = cloudinary.url(user.avatar, {
      height: 50,
      width: 50,
      radius: 'max',
      gravity: 'face'
    });

    const toggleImageError = () => handleImageError(true)

    return (
      <div>
        <Avatar icon={<img src={imageSource} alt='' onError={toggleImageError} />} />
      </div>
    );
  }

  return (
    <Avatar style={{ backgroundColor: letterToColor(), ...style }}>
      {user.username[0].toUpperCase()}
    </Avatar>
  );
};
