import React from 'react';
import { Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
// import { useUpdateListNameMutation } from '../generated/graphql';

interface Props extends FormComponentProps {
  title: string;
}

const ListTitleForm: React.FC<Props> = ({ title, form }) => {
  const { getFieldDecorator } = form;
  // const [updateListName] = useUpdateListNameMutation();

  // submit when fieldtouched && !focus
  return (
    <Form>
      <Form.Item>
        {getFieldDecorator('name', {
          rules: [{ required: true, message: 'List name is required' }]
        })}
        <Input value={title} />
      </Form.Item>
    </Form>
  );
};

export default Form.create<Props>({ name: 'listTitle' })(ListTitleForm);
