import React, { useState, useRef } from 'react';
import { Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { useUpdateListNameMutation } from '../generated/graphql';
import styles from './TitleForm.module.scss';
import TextArea from 'antd/lib/input/TextArea';

interface Props extends FormComponentProps {
  defaultTitle: string;
  id: number;
  mutationHook?: any;
  mutationVariableName?: string;
  color?: string;
  fontSize?: string;
  rows?: number;
}

const TitleForm: React.FC<Props> = ({
  defaultTitle,
  form,
  id,
  mutationHook,
  mutationVariableName,
  color = 'white',
  fontSize = '1em',
  rows = 1
}) => {
  const { getFieldDecorator, getFieldValue } = form;
  const inputRef = useRef<TextArea>(null);
  const [title, setTitle] = useState(defaultTitle);
  const [background, setBackground] = useState(color);

  let mutate: any;

  if (mutationHook && mutationVariableName) {
    const variables = {
      [mutationVariableName]: title,
      id: id.toString()
    };

    [mutate] = mutationHook({
      variables
    });
  }

  const handleFocus = () => {
    setBackground('white');
  };

  const handleBlur = () => {
    setBackground(color);
    if (getFieldValue('name').localeCompare(defaultTitle) !== 0) {
      if (mutationHook) {
        mutate();
      }
    }
  };

  return (
    <Form className={styles.form} style={{ width: '100%' }}>
      <Form.Item style={{ margin: 0 }}>
        {getFieldDecorator('name', {
          rules: [{ required: true, message: 'List name is required' }],
          initialValue: title
        })(
          <TextArea
            autoSize={true}
            spellCheck={false}
            // rows={rows}
            onFocus={handleFocus}
            onBlur={handleBlur}
            ref={inputRef}
            onChange={e => setTitle(e.target.value)}
            onPressEnter={() => inputRef.current!.blur()}
            style={{
              border: 'none',
              background,
              transition: 'background-color 0.5s ease',
              fontWeight: 600,
              fontSize,
              resize: 'none',
              wordWrap: 'break-word',
              paddingBottom: `0px`,
              paddingTop: `0px`,
              lineHeight: `2em`,
              minHeight: `10px`
            }}
            className={styles.input}
          />
        )}
      </Form.Item>
    </Form>
  );
};

export default Form.create<Props>({ name: 'listTitle' })(TitleForm);
