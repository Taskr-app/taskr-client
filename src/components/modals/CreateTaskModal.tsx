import React from 'react';
import { Modal, Form, Input, Icon } from 'antd';
import { useModal } from '.';
import { useCreateTaskMutation } from '../../generated/graphql';
import { FormComponentProps } from 'antd/lib/form';
import { errorMessage } from '../../lib/messageHandler';

interface Props extends FormComponentProps {
  listId: string;
}

interface RouteParams {
  projectId: string;
  projectName: string;
}

const CreateTaskModal: React.FC<Props> = ({ listId, form }) => {
  const { getFieldDecorator, validateFields } = form;
  const { hideModal } = useModal();
  const unmount = () => hideModal();
  const [createTask] = useCreateTaskMutation({
    onCompleted: () => unmount(),
    onError: err => errorMessage(err)
  });

  const handleSubmit = () => {
    validateFields((validationErrors, { name, desc }) => {
      if (!validationErrors) {
        createTask({ variables: { name, listId, desc } });
      }
    });
  };

  return (
    <Modal
      visible={true}
      title="Create Task"
      onOk={handleSubmit}
      onCancel={unmount}
    >
      <Form>
        <Form.Item>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Task name is required' }]
          })(
            <Input
              prefix={
                <Icon type="align-center" style={{ color: 'rgba(0,0,0,.25' }} />
              }
              placeholder="List name"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('desc')(
            <Input
              prefix={
                <Icon type="align-center" style={{ color: 'rgba(0,0,0,.25' }} />
              }
              placeholder="Task description"
            />
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Form.create<Props>({ name: 'createList' })(CreateTaskModal);
