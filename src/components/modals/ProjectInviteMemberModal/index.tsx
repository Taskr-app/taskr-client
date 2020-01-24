/* eslint-disable no-unused-vars */
import React from 'react';
import styles from './ProjectInviteMemberModal.module.scss';
import { Modal, Form, message, Spin, Select, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import {
  useSendProjectInviteLinkMutation,
  useGetUsersByEmailLazyQuery
} from '../../../generated/graphql';
import { errorMessage } from '../../../lib/messageHandler';
import { useModal } from '..';
import { validateEmail, validateEmails } from '../../../lib/validateEmail';
import { UserAvatar, PartialUser } from '../../common/Avatar';
import { debounce } from 'lodash';

interface Props extends FormComponentProps {
  projectId: string;
}

const ProjectInviteMemberModal: React.FC<Props> = ({ projectId, form }) => {
  const { getFieldDecorator, validateFields } = form;
  const { hideModal } = useModal();
  const unmount = () => hideModal();
  const [inviteMember, { loading }] = useSendProjectInviteLinkMutation({
    onCompleted: () => {
      message.success('Your invitations has been successfully sent.');
      unmount();
    },
    onError: err => errorMessage(err)
  });

  const [
    getUsersByEmail,
    { data, loading: searchLoading }
  ] = useGetUsersByEmailLazyQuery();

  const fetchUsers = (value: string) => {
    if (value.length >= 3) {
      getUsersByEmail({
        variables: {
          search: value
        }
      });
    }
  };

  const handleSubmit = () => {
    validateFields(async (validationErrors, { emails, message }) => {
      if (!validationErrors) {
        await inviteMember({ variables: { emails, projectId, message } });
      }
    });
  };

  const handleSelect = (value: any) => {
    if (!validateEmail(value)) {
      form.setFields({
        emails: {
          value: form.getFieldValue('emails'),
          errors: [new Error(`${value} is not a valid email`)]
        }
      });
    }
  };

  const limitTags = (_: any, value: string, callback: any) => {
    const { getFieldValue } = form;
    if (value && getFieldValue('emails').length >= 5) {
      callback('Can only select a maximum of 5 emails');
    } else {
      callback();
    }
  };

  return (
    <Modal
      visible={true}
      title='Invite Member'
      onOk={handleSubmit}
      onCancel={unmount}
      okText={'Send Invitation'}
      confirmLoading={loading}
    >
      <Form>
        <Form.Item>
          {getFieldDecorator('emails', {
            rules: [
              { required: true, message: 'Email is required', type: 'array' },
              { validator: validateEmails(form, 'emails') },
              {
                validator: limitTags
              }
            ]
          })(
            <Select
              mode='tags'
              onSearch={debounce(fetchUsers, 800)}
              placeholder='example@email.com'
              optionLabelProp={'value'}
              showSearch={true}
              onSelect={handleSelect}
              notFoundContent={searchLoading ? <Spin size='small' /> : null}
            >
              {data &&
                data.getUsersByEmail.map((user: PartialUser) => (
                  <Select.Option
                    key={`user-email-filter-${user.id}`}
                    value={user.email}
                  >
                    {
                      <div className={styles.optionContainer}>
                        <div className={styles.optionAvatar}>
                          <UserAvatar user={user} />
                        </div>

                        <div className={styles.optionLabels}>
                          <span className={styles.username}>
                            {user.username}
                          </span>
                          <span className={styles.email}>{user.email}</span>
                        </div>
                      </div>
                    }
                  </Select.Option>
                ))}
            </Select>
          )}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator('message', {
            rules: [{ max: 240, message: 'Exceeded maximum character length'}]
          })(
            <Input.TextArea
              placeholder={'Give your recipients a nice welcome message for your project'}
              autoSize={{
                minRows: 4,
                maxRows: 4
              }}
              maxLength={240}
            />
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Form.create<Props>({ name: 'project-invite-member' })(
  ProjectInviteMemberModal
);
