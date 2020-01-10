import React from 'react';
import { Modal, Form, Input, Icon, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { useSendProjectInviteLinkMutation } from '../../generated/graphql';
import { errorMessage } from '../../lib/messageHandler';
import { useModal } from '.';
import { validateEmail } from '../../lib/validateEmail';

interface Props extends FormComponentProps {
  projectId: string;
}

const InviteMemberModal: React.FC<Props> = ({ projectId, form }) => {
  const { getFieldDecorator, validateFields } = form;
  const { hideModal } = useModal();
  const unmount = () => hideModal();
  const [inviteMember, { loading }] = useSendProjectInviteLinkMutation({
    onCompleted: () => {
      message.success('A project invitation has been successfully sent.');
      unmount();
    },
    onError: err => errorMessage(err)
  });

  const handleSubmit = () => {
    validateFields(async (_, { email }) => {
      const { setFields, getFieldError } = form;
      if (!validateEmail(email)) {
        setFields({
          email: {
            value: email,
            errors: [new Error('Not a valid email')]
          }
        });
      }
      if (!getFieldError('email')) {
        await inviteMember({ variables: { email, projectId } });
      }
    });
  };

  return (
    <Modal
      visible={true}
      title='Invite Member'
      onOk={handleSubmit}
      onCancel={unmount}
      confirmLoading={loading}
    >
      <Form>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Email is required' }]
          })(
            <Input
              prefix={
                <Icon type='align-center' style={{ color: 'rgba(0,0,0,.25' }} />
              }
              placeholder='Email'
            />
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Form.create<Props>({ name: 'inviteMember' })(InviteMemberModal);
