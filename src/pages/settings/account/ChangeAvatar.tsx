import React, { useState, useEffect, useCallback } from 'react';
import styles from './Settings.module.scss';
import { useDropzone } from 'react-dropzone';
import { useUploadAvatarMutation, MeDocument } from '../../../generated/graphql';
import { message } from 'antd';
import { errorMessage } from '../../../lib/messageHandler';

const ChangeAvatar: React.FC = () => {
  const [preview, setPreview] = useState('');
  const [createAvatar] = useUploadAvatarMutation({
    onCompleted: () => message.success('Image was uploaded successfully'),
    onError: err => errorMessage(err)
  });
  const { acceptedFiles, getInputProps, getRootProps } = useDropzone({
    onDrop: useCallback(([file]) => {
      setPreview(URL.createObjectURL(file))
    }, [setPreview, preview, createAvatar])
  });

  useEffect(() => {
    URL.revokeObjectURL(preview);
  }, [preview]);

  const handleClick = useCallback(async () => {
    const image = acceptedFiles[0]
    createAvatar({
      variables: {
        image,
      },
      refetchQueries: [{ query: MeDocument }]
    });
  }, [acceptedFiles[0]]);

  return (
    <>
      <div {...getRootProps({ className: styles.dropzone })}>
        <input {...getInputProps()} />
        {preview ? (
          <img className={styles.imagePreview} src={preview} alt='' />
        ) : (
          <div>Drop Zone</div>
        )}
      </div>
      {acceptedFiles[0] && <button onClick={handleClick}>Save</button>}
    </>
  );
};

export default ChangeAvatar;
