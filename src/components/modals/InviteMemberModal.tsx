import React from 'react';
import { Modal, Form, Input, Icon } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { useSendProjectInviteLinkMutation } from '../../generated/graphql';
import { errorMessage } from '../../lib/messageHandler';
import { useModal } from '.';

interface Props extends FormComponentProps {
  projectId: string;
}

const InviteMemberModal: React.FC<Props> = ({ projectId, form }) => {
  const { getFieldDecorator, validateFields } = form;
  const { hideModal } = useModal();
  const unmount = () => hideModal();
  const [inviteMember] = useSendProjectInviteLinkMutation({
    onCompleted: () => unmount(),
    onError: err => errorMessage(err)
  });

  const handleSubmit = () => {
    validateFields((validationErrors, { email }) => {
      if (!validationErrors) {
        inviteMember({ variables: { email, projectId } });
      }
    });
  };
  return (
    <Modal
      visible={true}
      title="Invite Member"
      onOk={handleSubmit}
      onCancel={unmount}
    >
      <Form>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Email is required' }]
          })(
            <Input
              prefix={
                <Icon type="align-center" style={{ color: 'rgba(0,0,0,.25' }} />
              }
              placeholder="Email"
            />
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Form.create<Props>({ name: 'inviteMember' })(InviteMemberModal);
