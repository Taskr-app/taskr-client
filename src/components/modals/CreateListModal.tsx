import React, { useCallback, useEffect } from 'react';
import { Modal, Form, Input, Icon } from 'antd';
import { useModal } from '.';
import { useCreateListMutation } from '../../generated/graphql';
import { FormComponentProps } from 'antd/lib/form';
import { errorMessage } from '../../lib/messageHandler';

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

  const handleEnterPress = useCallback(e => {
    const { keyCode } = e;
    if (keyCode === 13 && form.isFieldTouched('name')) {
      handleSubmit();
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleEnterPress);

    return () => {
      window.removeEventListener('keydown', handleEnterPress);
    };
  }, [handleEnterPress]);

  const handleSubmit = () => {
    console.log('submittig');
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
              autoFocus
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
