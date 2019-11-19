import React from 'react';
import { Card } from 'antd';
import { useModal } from './modals';
import DeleteListModal from './modals/DeleteListModal';
import ListTitleForm from './ListTitleForm';
import { LinkText } from './common/Text';

interface Props {
  ref?: any;
  id: number;
  name: string;
}

const List: React.FC<Props> = ({ id, name }) => {
  const { showModal } = useModal();
  const showDeleteListModal = () =>
    showModal(<DeleteListModal name={name} id={id} />);
  const handleClick = () => {
    showDeleteListModal();
  };
  return (
    <Card
      title={<ListTitleForm defaultTitle={name} id={id} />}
      style={{ minWidth: 300 }}
      key={id}
      extra={<LinkText onClick={handleClick}>...</LinkText>}
    >
      <p>task filler</p>
      <p>task filler</p>
      <p>task filler</p>
    </Card>
  );
};

export default List;
