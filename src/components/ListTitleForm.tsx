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
  const { getFieldDecorator } = form;
  const inputRef = useRef<Input>(null);
  const [title, setTitle] = useState(defaultTitle);
  const [updateListName] = useUpdateListNameMutation({
    variables: { name: title, id: id.toString() }
  });

  return (
    <Form>
      <Form.Item>
        {getFieldDecorator('name', {
          rules: [{ required: true, message: 'List name is required' }],
          initialValue: title
        })(
          <Input
            onBlur={() => updateListName()}
            ref={inputRef}
            onChange={e => setTitle(e.target.value)}
            onPressEnter={() => inputRef.current!.blur()}
            style={{ border: 'none' }}
            className={styles.input}
          />
        )}
      </Form.Item>
    </Form>
  );
};

export default Form.create<Props>({ name: 'listTitle' })(ListTitleForm);
