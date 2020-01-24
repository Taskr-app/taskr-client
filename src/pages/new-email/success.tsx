import React, { useEffect } from 'react';
import styles from './NewEmail.module.scss';
import Layout from '../../components/layouts/Layout';
import ErrorLayout from '../../components/layouts/ErrorLayout';
import {
  useValidateLinkQuery,
  useUpdateEmailMutation,
  useMeQuery,
  useLogoutMutation,
  UserAuthType
} from '../../generated/graphql';
import { useLocation, useHistory, Link } from 'react-router-dom';
import { queryParse } from '../../lib/queryParser';
import { errorMessage } from '../../lib/messageHandler';
import AuthLayout from '../../components/auth/AuthLayout';
import { Form, Input, Icon, Button, message } from 'antd';
import { DescriptionText } from '../../components/common/Text';
import { FormComponentProps } from 'antd/lib/form';
import { setAccessToken } from '../../lib/accessToken';

/**
 * 
 * @routeQueries - id | email
 */

const NewEmailSuccessPage: React.FC<FormComponentProps> = ({ form }) => {
  const { data } = useMeQuery();
  const history = useHistory();
  const location = useLocation();
  const routeQueries = queryParse(location.search);

  const { data: validated, loading: validateLoading } = useValidateLinkQuery({
    variables: {
      key: `new-email-${routeQueries.email}`,
      link: routeQueries.id
    },
    onError: err => errorMessage(err)
  });
  const [logout, { client }] = useLogoutMutation({
    onCompleted: async () => {
      setAccessToken('');
      await client!.clearStore();
      history.push('/login');
    }
  });
  const [updateEmail, { loading }] = useUpdateEmailMutation({
    variables: {
      email: routeQueries.email,
      verificationLink: routeQueries.id
    },
    onCompleted: () => {
      message.success('Your email has been successfully changed.');
      logout();
    },
    onError: err => errorMessage(err)
  });

  useEffect(() => {
    if (!routeQueries.id || !routeQueries.email) {
      history.push('/');
      return;
    }

    if (validated && data && data.me.auth === UserAuthType.Website) {
      const fetchData = async () => {
        await updateEmail();
      };
      fetchData();
    }
  }, [validated]);

  if (!validated && !validateLoading) {
    return (
      <ErrorLayout message={'This link has expired or has already been used'} />
    );
  }

  if (!data) {
    return (
      <ErrorLayout
        message={
          <span>
            You must be{' '}
            <Link
              to={`/login?returnUrl=/new-email/success&email=${routeQueries.email}&id=${routeQueries.id}`}
            >
              logged in
            </Link>{' '}
            to confirm your email change.
          </span>
        }
      />
    );
  }

  if (data && data.me.auth === 'GOOGLE') {
    const { getFieldDecorator } = form;
    const compareOriginalPassword = (_: any, value: string, callback: any) => {
      const { getFieldValue } = form;
      if (value && value !== getFieldValue('password')) {
        callback('Passwords do not match');
      } else {
        callback();
      }
    };

    const handleSubmit = (e: React.SyntheticEvent) => {
      e.preventDefault();
      const { validateFields } = form;
      validateFields(async (validationErrors, { password }) => {
        if (!validationErrors) {
          await updateEmail({
            variables: {
              email: routeQueries.email,
              verificationLink: routeQueries.id,
              password
            }
          });
        }
      });
    };

    return (
      <Layout hide={1} dark={1}>
        <div className={styles.container}>
          <AuthLayout>
            <Form onSubmit={handleSubmit}>
              <DescriptionText style={{ marginBottom: '25px' }}>
                You will need to set a new password for your new email address
                because your current email address is using Google's OAuth
                services. You will still be able to login through Google's OAuth
                services if your new email address is a gmail account.
              </DescriptionText>

              <Form.Item hasFeedback>
                {getFieldDecorator('password', {
                  rules: [
                    { required: true, message: 'Password field is required' },
                    {
                      min: 6,
                      message: 'Password must be at least 6 characters'
                    }
                  ]
                })(
                  <Input.Password
                    prefix={
                      <Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    placeholder='New password'
                  />
                )}
              </Form.Item>
              <Form.Item hasFeedback>
                {getFieldDecorator('confirmPassword', {
                  rules: [
                    { required: true, message: 'Please confirm your password' },
                    { validator: compareOriginalPassword }
                  ]
                })(
                  <Input.Password
                    prefix={
                      <Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    placeholder='Confirm password'
                  />
                )}
              </Form.Item>

              <Form.Item>
                <Button
                  htmlType='submit'
                  type='primary'
                  style={{ width: '100%' }}
                  loading={loading}
                >
                  Confirm new password
                </Button>
              </Form.Item>
            </Form>
          </AuthLayout>
        </div>
      </Layout>
    );
  }

  return (
    <Layout hide={1}>
      <></>
    </Layout>
  );
};

export default Form.create({ name: 'newEmailSuccess' })(NewEmailSuccessPage);
