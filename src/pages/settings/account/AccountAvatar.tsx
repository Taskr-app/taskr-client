/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import styles from './AccountSettings.module.scss';
import { User } from '../../../generated/graphql';
import classNames from 'classnames';
import { cloudinary } from '../../../lib/cloudinary';
import { Empty, Avatar } from 'antd';
import { useDropzone } from 'react-dropzone';

interface Props {
  user: Partial<User>;
  editing?: boolean;
}

const AccountAvatar: React.FC<Props> = ({ user, editing }) => {
  const [preview, setPreview] = useState('');
  const { acceptedFiles, getInputProps, getRootProps } = useDropzone({
    onDrop: useCallback(
      ([file]) => {
        setPreview(URL.createObjectURL(file));
      },
      [setPreview, preview]
    )
  });
  useEffect(() => {
    URL.revokeObjectURL(preview);
  }, [preview]);
  const avatarStyle = classNames(styles.avatar, {
    [styles.edit]: editing
  });

  const renderImagePreview = () => {
    if (preview) {
      return <img className={avatarStyle} src={preview} alt='' />;
    }

    if (user.avatar) {
      return (
        <img
          className={avatarStyle}
          src={cloudinary.url(user.avatar, {
            height: 125,
            width: 125,
            radius: 'max',
            gravity: 'face'
          })}
          alt=''
        />
      );
    }

    return (
      <div className={classNames(avatarStyle, styles.empty)}>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </div>
    );
  };

  return (
    <div className={styles.avatarSettings}>
      {renderImagePreview()}
      {editing && (
        <div {...getRootProps({ className: styles.avatarCover })}>
          <input {...getInputProps()} />
          <span>CHANGE AVATAR</span>
        </div>
      )}

      {editing && (
        <div className={styles.addIcon}>
          <Avatar icon='file-add' />
        </div>
      )}
    </div>
  );
};

export default AccountAvatar;
