import React, { useState } from 'react';
import styles from './AccountSettings.module.scss';
import classNames from 'classnames';
import {
  useMeQuery,
  useUpdateUsernameMutation,
  MeDocument,
  useSendNewEmailLinkMutation,
  useUploadAvatarMutation
} from '../../../generated/graphql';
import AccountAvatar from './AccountAvatar';
import { SubText, DescriptionText } from '../../../components/common/Text';
import { Form, Input, Button, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { errorMessage } from '../../../lib/messageHandler';

interface Props extends FormComponentProps {
  handleEdit: () => void;
}

const AccountSettingsForm: React.FC<FormComponentProps & Props> = ({
  form,
  handleEdit
}) => {
  const { data } = useMeQuery();
  const [file, setFile] = useState<File | null>(null);
  const [updateUsername] = useUpdateUsernameMutation({
    onCompleted: () => message.success('Your username has been changed'),
    onError: err => errorMessage(err),
  });
  const [sendNewEmailLink] = useSendNewEmailLinkMutation({
    onCompleted: () =>
      message.info(
        <span>An email has been sent with steps to change your email.</span>
      ),
    onError: err => errorMessage(err)
  });
  const [uploadAvatar] = useUploadAvatarMutation({
    onError: err => errorMessage(err),
  });

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { validateFields } = form;
    validateFields(async (validationErrors, { email, username }) => {
      if (validationErrors) return;
      if (username !== data!.me.username) {
        await updateUsername({
          variables: {
            username
          }
        });
      }

      if (email !== data!.me.email) {
        await sendNewEmailLink({
          variables: {
            email
          }
        });
      }

      if (file) {
        await uploadAvatar({
          variables: {
            image: file
          },
          refetchQueries: [{ query: MeDocument }]
        });
      }
      handleEdit();
    });
  };

  if (!data) {
    return <></>;
  }

  const { getFieldDecorator } = form;

  return (
    <Form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <div className={styles.accountSettings}>
        <div className={styles.left}>
          <AccountAvatar user={data.me} editing={true} setFile={setFile} />
        </div>

        <div className={classNames(styles.right, styles.edit)}>
          <div>
            <SubText>
              Username <span style={{ color: '#f5222d' }}>*</span>
            </SubText>
            <Form.Item style={{ marginBottom: '20px' }}>
              {getFieldDecorator('username', {
                initialValue: data.me.username,
                rules: [
                  { required: true, message: 'Username field is required' }
                ]
              })(<Input autoFocus />)}
            </Form.Item>
          </div>

          <div>
            <SubText>
              Email <span style={{ color: '#f5222d' }}>*</span>
            </SubText>
            <DescriptionText>
              An email will be sent to validate your new email address. Your
              current email will still be available until you confirm and
              validate the new email address.
            </DescriptionText>
            <Form.Item style={{ marginBottom: '20px' }}>
              {getFieldDecorator('email', {
                initialValue: data.me.email,
                rules: [{ required: true, message: 'Email field is required' }]
              })(<Input required />)}
            </Form.Item>
          </div>
        </div>

        <div className={classNames(styles.end, styles.bottom)}>
          <Button className={styles.cancel} onClick={handleEdit}>
            Cancel
          </Button>
          <Button type='primary' htmlType='submit'>
            Save
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default Form.create<Props>({ name: 'account-settings' })(
  AccountSettingsForm
);
