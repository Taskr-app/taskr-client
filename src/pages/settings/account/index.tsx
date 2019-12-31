import React, { useState } from 'react';
import ChangePassword from './ChangePassword';
import { SubText, LinkText } from '../../../components/common/Text';
import { useMeQuery } from '../../../generated/graphql';
import styles from './AccountSettings.module.scss';
import { Button, Divider } from 'antd';
import AccountAvatar from './AccountAvatar';
import AccountSettingsForm from './AccountSettingsForm';

const AccountSettingsPage: React.FC = () => {
  const { data } = useMeQuery();
  const [editing, handleEdit] = useState(false);
  const [changePassword, showChangePassword] = useState(false);

  const toggleEditing = () => handleEdit(!editing);

  if (!data) {
    return <></>;
  }

  const handleChangePassword = () => {
    showChangePassword(!changePassword);
  };

  return (
    <>
      {!editing ? (
        <AccountSettingsForm handleEdit={toggleEditing} />
      ) : (
        <div className={styles.accountSettings}>
          <>
            <div className={styles.left}>
              <AccountAvatar user={data.me} />
            </div>

            <div className={styles.right}>
              <div className={styles.username}>
                <SubText>Username</SubText>
                <p>{data.me.username}</p>
              </div>

              <div className={styles.email}>
                <SubText>Email</SubText>
                <p>{data.me.email}</p>
              </div>
            </div>

            <div className={styles.end}>
              <Button type='primary' onClick={toggleEditing}>
                Edit
              </Button>
            </div>
          </>
        </div>
      )}

      <Divider />

      <div className={styles.labels}>
        <LinkText
          onClick={handleChangePassword}
          style={{ marginBottom: '15px' }}
        >
          Change password
        </LinkText>
        {changePassword && <ChangePassword />}
      </div>
    </>
  );
};

export default AccountSettingsPage;
