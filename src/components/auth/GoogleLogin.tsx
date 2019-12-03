import React, { useEffect } from 'react';
import { Button } from 'antd';
import { useLoginGoogleOAuthLazyQuery } from '../../generated/graphql';
import { useLocation } from 'react-router';
import { queryParse } from '../../lib/queryParser';

const GoogleLogin: React.FC = () => {
  const location = useLocation();
  const routeQueries = queryParse(location.search);
  const [useGoogleURL, { data }] = useLoginGoogleOAuthLazyQuery();

  useEffect(() => {
    if (data && data.loginGoogleOAuth) {
      window.location.href = data.loginGoogleOAuth;
    }
  }, [data]);

  const HandleGoogleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await useGoogleURL({
      variables: {
        returnUrl: JSON.stringify(routeQueries)
      }
    });
  };

  return (
    <Button onClick={HandleGoogleLogin} icon='google' style={{ width: '100%' }}>
      Sign in with Google
    </Button>
  );
};

export default GoogleLogin;
