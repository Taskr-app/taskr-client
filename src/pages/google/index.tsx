import React, { useEffect } from "react";
import { setAccessToken } from "../../lib/accessToken";
import { useAuth_GoogleOAuthMutation } from "../../generated/graphql";
import { useHistory, useLocation } from "react-router";
import { queryStringify, queryParse } from "../../lib/queryParser";

const GoogleOAuth: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const routeQueries = queryParse(location.search)
  const { code, state }: { code?: string; state?: string } = routeQueries;
  const [auth] = useAuth_GoogleOAuthMutation({
    onCompleted: data => {
      setAccessToken(data.auth_googleOAuth.accessToken);
      if (state && Object.keys(JSON.parse(state)).length) {
        const routeQuery = JSON.parse(routeQueries.state);
        const { returnUrl, ...queryParams } = routeQuery;
        history.push({
          pathname: returnUrl,
          search: queryStringify({
            ...queryParams
          })
        });
      } else {
        window.location.href = process.env.REACT_APP_CLIENT_URL!;
      }
    }
  });
  
  useEffect(() => {
    if (code) {
      const fetchGoogleUser = async () => {
        auth({
          variables: { code }
        });
      };
      fetchGoogleUser();
    }
  }, []);
  return <></>;
};

export default GoogleOAuth;
