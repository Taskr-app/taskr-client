import React, { useEffect } from "react";
import { setAccessToken } from "../../lib/accessToken";
import { useAuth_GoogleOAuthMutation } from "../../generated/graphql";
import { useHistory, useParams } from "react-router";
import { queryConcat } from "../../lib/queryConcat";

interface RouteParams {
  [key: string]: string
}

const GoogleOAuth: React.FC = () => {
  const history = useHistory();
  const params = useParams<RouteParams>();
  const { code, state }: { code?: string; state?: string } = params;
  const [auth] = useAuth_GoogleOAuthMutation({
    onCompleted: data => {
      setAccessToken(data.auth_googleOAuth.accessToken);
      if (state && Object.keys(JSON.parse(state)).length) {
        const routeQuery = JSON.parse(params.state);
        const { returnUrl, ...queryParams } = routeQuery;
        history.push({
          pathname: returnUrl,
          search: queryConcat({
            ...params
          })
        });
      } else {
        window.location.href = process.env.CLIENT_URL!;
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
