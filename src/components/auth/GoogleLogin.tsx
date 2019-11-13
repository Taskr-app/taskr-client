import React, { useEffect } from "react";
import { Button } from "antd";
import { useLoginGoogleOAuthLazyQuery } from "../../generated/graphql";
import { useParams } from "react-router";

const GoogleLogin: React.FC = () => {
  const params = useParams();
  const [
    useGoogleURL,
    { data, called, error, loading }
  ] = useLoginGoogleOAuthLazyQuery()

  useEffect(() => {
    if (called && !error && !loading && data && data.loginGoogleOAuth) {
      window.location.href = data.loginGoogleOAuth
    }
  }, [data, called, error, loading]);

  const HandleGoogleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await useGoogleURL({
      variables: {
        returnUrl: JSON.stringify(params)
      }
    });
  };

  return (
    <Button onClick={HandleGoogleLogin} icon="google" style={{ width: "100%" }}>
      Sign in with Google
    </Button>
  );
};

export default GoogleLogin;
