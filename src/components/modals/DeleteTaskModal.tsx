import React from 'react';
import { Modal } from 'antd';
import { useModal } from '.';
import { useDeleteTaskMutation } from '../../generated/graphql';

interface Props {
  name: string;
  id: number;
}

const DeleteTaskModal: React.FC<Props> = ({ name, id }) => {
  const { hideModal } = useModal();
  const unmount = () => hideModal();
  const [deleteTask] = useDeleteTaskMutation({ onCompleted: () => unmount() });

  const handleSubmit = () => {
    deleteTask({ variables: { taskId: id.toString() } });
  };

  return (
    <Modal
      visible={true}
      title="Delete Task"
      onOk={handleSubmit}
      onCancel={unmount}
    >
      Delete {name}?
    </Modal>
  );
};

export default DeleteTaskModal;
