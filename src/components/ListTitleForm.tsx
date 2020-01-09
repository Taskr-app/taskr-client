import React, { useState, useRef } from 'react';
import { Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { useUpdateListNameMutation } from '../generated/graphql';
import styles from './ListTitleForm.module.scss';

interface Props extends FormComponentProps {
  defaultTitle: string;
  id: number;
}

const ListTitleForm: React.FC<Props> = ({ defaultTitle, form, id }) => {
  const { getFieldDecorator, getFieldValue } = form;
  const inputRef = useRef<Input>(null);
  const [title, setTitle] = useState(defaultTitle);
  const [background, setBackground] = useState('#f4f8f8');

  const [updateListName] = useUpdateListNameMutation({
    variables: { name: title, id: id.toString() }
  });

  const handleFocus = () => {
    setBackground('white');
  };

  const handleBlur = () => {
    setBackground('#f4f8f8');
    if (getFieldValue('name').localeCompare(defaultTitle) !== 0) {
      updateListName();
    }
  };

  const getInputStyle = () => ({
    border: 'none',
    background,
    transition: 'background-color 0.5s ease',
    fontWeight: 600
  });

  return (
    <Form>
      <Form.Item style={{ margin: 0 }}>
        {getFieldDecorator('name', {
          rules: [{ required: true, message: 'List name is required' }],
          initialValue: title
        })(
          <Input
            onFocus={handleFocus}
            onBlur={handleBlur}
            ref={inputRef}
            onChange={e => setTitle(e.target.value)}
            onPressEnter={() => inputRef.current!.blur()}
            style={getInputStyle()}
            className={styles.input}
          />
        )}
      </Form.Item>
    </Form>
  );
};

export default Form.create<Props>({ name: 'listTitle' })(ListTitleForm);
