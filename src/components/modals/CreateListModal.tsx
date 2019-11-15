import React from 'react';
import { Modal, Form, Input, Icon } from 'antd';
import { useModal } from '.';
import { useCreateListMutation } from '../../generated/graphql';
import { FormComponentProps } from 'antd/lib/form';
import { errorMessage } from '../../lib/messageHandler';
import { useParams } from 'react-router';
import { decode } from '../../lib/hashids';

interface Props extends FormComponentProps {
  projectId: string;
}

interface RouteParams {
  projectId: string;
  projectName: string;
}

const CreateListModal: React.FC<Props> = ({ projectId, form }) => {
  const { getFieldDecorator, validateFields } = form;
  const { hideModal } = useModal();
  const unmount = () => hideModal();
  const [createList] = useCreateListMutation({
    onCompleted: () => unmount(),
    onError: err => errorMessage(err)
  });

  const handleSubmit = () => {
    validateFields((validationErrors, { name }) => {
      if (!validationErrors) {
        createList({ variables: { name, projectId } });
      }
    });
  };

  return (
    <Modal
      visible={true}
      title="Create List"
      onOk={handleSubmit}
      onCancel={unmount}
    >
      <Form>
        <Form.Item>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'List name is required' }]
          })(
            <Input
              prefix={
                <Icon type="align-center" style={{ color: 'rgba(0,0,0,.25' }} />
              }
              placeholder="List name"
            />
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Form.create<Props>({ name: 'createList' })(CreateListModal);
