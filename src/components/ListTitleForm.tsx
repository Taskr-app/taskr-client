import React, { useState, useRef, useEffect } from 'react';
import { Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { useUpdateListNameMutation } from '../generated/graphql';

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
          rules: [{ required: true, message: 'List name is required' }]
        })}
        <Input
          onBlur={() => updateListName()}
          value={title}
          ref={inputRef}
          onChange={e => setTitle(e.target.value)}
          onPressEnter={() => inputRef.current!.blur()}
        />
      </Form.Item>
    </Form>
  );
};

export default Form.create<Props>({ name: 'listTitle' })(ListTitleForm);
