import React from 'react';
import styles from './AccountSettings.module.scss';
import classNames from 'classnames';
import { useMeQuery } from '../../../generated/graphql';
import AccountAvatar from './AccountAvatar';
import { SubText } from '../../../components/common/Text';
import { Form, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

interface Props extends FormComponentProps {
  handleEdit: () => void;
}

const AccountSettingsForm: React.FC<FormComponentProps & Props> = ({ form, handleEdit }) => {
  const { data } = useMeQuery();
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  if (!data) {
    return <></>;
  }

  const { getFieldDecorator } = form;

  return (
    <Form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <div className={styles.accountSettings}>
        <div className={styles.left}>
          <AccountAvatar user={data.me} editing={true} />
        </div>

        <div className={classNames(styles.right, styles.edit)}>
          <div>
            <SubText>
              Username <span style={{ color: '#f5222d' }}>*</span>
            </SubText>
            <Form.Item style={{ marginBottom: '20px' }}>
              {getFieldDecorator('username', {
                initialValue: data.me.username,
                rules: [
                  { required: true, message: 'Username field is required' }
                ]
              })(<Input autoFocus />)}
            </Form.Item>
          </div>

          <div>
            <SubText>
              Email <span style={{ color: '#f5222d' }}>*</span>
            </SubText>
            <Form.Item style={{ marginBottom: '20px' }}>
              {getFieldDecorator('username', {
                initialValue: data.me.email,
                rules: [{ required: true, message: 'Email field is required' }]
              })(<Input required />)}
            </Form.Item>
          </div>

          <div>
            <SubText>
              Current password <span style={{ color: '#f5222d' }}>*</span>
            </SubText>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Current password field is required'
                  },
                  { min: 6, message: 'Password must be at least 6 characters' }
                ]
              })(<Input.Password required />)}
            </Form.Item>
          </div>
        </div>

        <div className={classNames(styles.end, styles.bottom)}>
          <Button className={styles.cancel} onClick={handleEdit}>
            Cancel
          </Button>
          <Button type='primary' onClick={() => null}>
            Save
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default Form.create<Props>({ name: 'account-settings' })(AccountSettingsForm);
