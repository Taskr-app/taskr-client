import React from 'react';
import Form, { FormComponentProps } from 'antd/lib/form';
import { Modal, Input, Button } from 'antd';
import { useModal } from '.';
import { useDeleteListMutation } from '../../generated/graphql';
import { useParams } from 'react-router';

interface Props {
  name: string;
  id: number;
}

const DeleteListModal: React.FC<Props> = ({ name, id }) => {
  const { hideModal } = useModal();
  const unmount = () => hideModal();
  const [deleteList] = useDeleteListMutation({ onCompleted: () => unmount() });

  const handleSubmit = () => {
    deleteList({ variables: { id: id.toString() } });
  };

  return (
    <Modal
      visible={true}
      title="Delete List"
      onOk={handleSubmit}
      onCancel={unmount}
    >
      Delete {name}?
    </Modal>
  );
};

export default DeleteListModal;
