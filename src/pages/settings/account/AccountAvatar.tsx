import React, { useCallback, useEffect, useState } from 'react';
import styles from './AccountSettings.module.scss';
import { User } from '../../../generated/graphql';
import classNames from 'classnames';
import { cloudinary } from '../../../lib/cloudinary';
import { Empty, Avatar, Icon } from 'antd';
import { useDropzone } from 'react-dropzone';

type Props = {
  editing: boolean;
  user: Partial<User>;
  setFile?: React.Dispatch<React.SetStateAction<File | null>>;
};

const AccountAvatar: React.FC<Props> = ({ user, editing, setFile }) => {
  const [preview, setPreview] = useState('');
  const [imageError, handleImageError] = useState<boolean>(false)
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

  useEffect(() => {
    setFile && setFile(acceptedFiles[0]);
  }, [acceptedFiles[0]]);

  const renderImagePreview = useCallback(() => {
    if (preview) {
      return <img className={avatarStyle} src={preview} alt='' />;
    }

    if (user.avatar && !imageError) {
      const cloudinaryUrl = cloudinary.url(user.avatar, {
        height: 125,
        width: 125,
        radius: 'max',
        gravity: 'face'
      });
      const toggleImageError = () => handleImageError(true)

      if (cloudinaryUrl) {
        return (
          <img
            className={avatarStyle}
            src={cloudinaryUrl}
            alt=''
            onError={toggleImageError}
          />
        );
      }
    }

    return (
      <div className={classNames(avatarStyle, styles.empty)}>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </div>
    );
  }, [preview, imageError, editing, user.avatar])

  const rootProps = editing
    ? getRootProps({ className: styles.avatarSettings })
    : null;
  return (
    <div className={styles.avatarSettings} {...rootProps}>
      {renderImagePreview()}
      {editing && (
        <div className={styles.avatarCover}>
          <input {...getInputProps()} />
          <span>CHANGE AVATAR</span>
        </div>
      )}

      {editing && (
        <div className={styles.addIcon}>
          <Avatar
            icon={<Icon type='file-add' style={{ opacity: '60%' }} />}
            style={{ backgroundColor: '#dcddde', color: 'black' }}
            shape='circle'
          />
        </div>
      )}
    </div>
  );
};

export default AccountAvatar;
