import React, { useEffect } from 'react';
import Layout from '../../../components/layouts/Layout';
import {
  useMeQuery,
  useAcceptProjectInviteLinkMutation,
  useValidateLinkQuery,
  useLogoutMutation
} from '../../../generated/graphql';
import AnonLayout from '../../../components/layouts/AnonLayout';
import ErrorLayout from '../../../components/layouts/ErrorLayout';
import { errorMessage } from '../../../lib/messageHandler';
import { useHistory, useLocation } from 'react-router';
import { queryStringify, queryParse } from '../../../lib/queryParser';
import { Redirect } from 'react-router-dom';
import { Button, message } from 'antd';
import { setAccessToken } from '../../../lib/accessToken';

const ProjectInviteSuccessPage: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const routeQueries = queryParse(location.search);
  const { data, loading } = useMeQuery();
  const { data: validated, loading: validateLoading } = useValidateLinkQuery({
    variables: {
      key: `project-invite-${routeQueries.email}`,
      link: routeQueries.id
    },
    onError: err => {
      errorMessage(err);
    }
  });
  const [acceptProjectInviteLink] = useAcceptProjectInviteLinkMutation({
    variables: {
      email: routeQueries.email,
      projectInviteLink: routeQueries.id
    },
    onCompleted: () => history.push({ pathname: '/' }),
    onError: err => errorMessage(err)
  });
  const [logout, { client }] = useLogoutMutation({
    onCompleted: async () => {
      setAccessToken('');
      await client!.clearStore();
      history.push({
        pathname: '/login',
        search: queryStringify({
          returnUrl: '/invite/project/success',
          registerKey: 'project-invite',
          ...routeQueries
        })
      });
    },
    onError: err => errorMessage(err)
  })

  useEffect(() => {
    if (!routeQueries.id || !routeQueries.email) {
      history.push('/');
    }

    if (data && validated && data.me.email === routeQueries.email) {
      const fetchData = async () => {
        await acceptProjectInviteLink();
      };
      fetchData();
    }
  }, [data, validated]);

  const handleSignup = () => {
    history.push({
      pathname: '/register',
      search: queryStringify({
        returnUrl: '/invite/project/success',
        registerKey: 'project-invite',
        ...routeQueries
      })
    });
  };

  const handleLogin = () => {
    history.push({
      pathname: '/login',
      search: queryStringify({
        returnUrl: '/invite/project/success',
        registerKey: 'project-invite',
        ...routeQueries
      })
    });
  };

  if (!validated && !validateLoading) {
    return (
      <ErrorLayout message={'This link has expired or has already been used'} />
    );
  }
  if (!loading && !data) {
    return <AnonLayout handleSignup={handleSignup} handleLogin={handleLogin} />;
  }

  if (data && data.me.email !== routeQueries.email) {

    const handleAccept = async () => {
      await logout();
      message.destroy()
    }

    message.info(
      <span style={{ position: 'relative' }}>
        A project invitation was sent to <b>{routeQueries.email}</b>
        <br />
        Do you want to switch accounts?
        <Button onClick={handleAccept} style={{ margin: '0 5px' }} type='primary'>Log in to a different account</Button>
        <Button onClick={() => message.destroy()}>Cancel</Button>
      </span>,
      0
    );

    return (
      <Redirect
        to={{
          pathname: '/'
        }}
      />
    );
  }

  return (
    <Layout hide={1}>
      <></>
    </Layout>
  );
};

export default ProjectInviteSuccessPage;
