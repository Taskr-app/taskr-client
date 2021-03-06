import React, { useEffect } from 'react';
import {
  useRegisterMutation,
  useResendVerificationLinkMutation,
  useMeLazyQuery
} from '../../generated/graphql';
import { setAccessToken } from '../../lib/accessToken';
import { message, Button, Icon, Spin } from 'antd';
import Layout from '../../components/layouts/Layout';
import ErrorLayout from '../../components/layouts/ErrorLayout';
import { errorMessage } from '../../lib/messageHandler';
import { useHistory, useLocation } from 'react-router';
import { queryStringify, queryParse } from '../../lib/queryParser';

const EmailVerificationSuccessPage: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const routeQueries = queryParse(location.search);
  const [register, { error: registerError }] = useRegisterMutation({
    variables: {
      email: routeQueries.email,
      verificationLink: routeQueries.id
    },
    onCompleted: data => {
      setAccessToken(data.register.accessToken);
      message.success('Congratulations! Welcome to Taskr', 2.5);
      getMe();
    },
    onError: () => {
      message.warning(
        <span>
          <span>
            The validation link you used has expired or is no longer valid.
          </span>
          {!loading ? (
            <Button type='link' onClick={resendVerificationEmail}>
              Resend verification link
            </Button>
          ) : (
            <Spin />
          )}

          <Icon
            type='close-circle'
            style={{ cursor: 'pointer' }}
            onClick={() => message.destroy()}
          />
        </span>,
        0
      );
      history.push('/');
    }
  });
  const [
    resendVerificationLink,
    { loading }
  ] = useResendVerificationLinkMutation({
    variables: {
      email: routeQueries.email
    },
    onCompleted: data => {
      history.push({
        pathname: '/email-verification',
        search: queryStringify({
          email: routeQueries.email,
          id: data.resendVerificationLink
        })
      });
    },
    onError: err => errorMessage(err)
  });
  const [getMe] = useMeLazyQuery();

  const resendVerificationEmail = async () => {
    await resendVerificationLink();
    message.destroy();
  };

  useEffect(() => {
    if (!routeQueries.id || !routeQueries.email) {
      history.push('/');
    }

    const fetchData = async () => {
      await register();
    };
    fetchData();
  }, []);

  if (registerError) {
    return <ErrorLayout />;
  }
  return (
    <Layout hide={1}>
      <></>
    </Layout>
  );
};

export default EmailVerificationSuccessPage;
