import React, { useEffect } from "react";
import {
  useRegisterMutation,
  useResendVerificationLinkMutation,
  useMeLazyQuery
} from "../../generated/graphql";
import { setAccessToken } from "../../lib/accessToken";
import { message, Button, Icon } from "antd";
import Layout from "../../components/layouts/Layout";
import ErrorLayout from "../../components/layouts/ErrorLayout";
import { errorMessage } from "../../lib/messageHandler";
import { useHistory, useLocation } from "react-router";
import { queryStringify, queryParse } from "../../lib/queryParser";

const EmailVerificationSuccessPage: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const routeQueries = queryParse(location.search)
  const [
    register,
    { error: registerError }
  ] = useRegisterMutation({
    variables: {
      email: routeQueries.email,
      verificationLink: routeQueries.id
    },
    onCompleted: data => {
      setAccessToken(data.register.accessToken);
      getMe();
    },
    onError: () => {
      message.warning(
        <span>
          <span>
            The validation link you used has expired or is no longer valid.
          </span>
          <Button type="link" onClick={resendVerificationEmail}>
            Resend verification link
          </Button>
          <Icon
            type="close-circle"
            style={{ cursor: "pointer" }}
            onClick={() => message.destroy()}
          />
        </span>,
        0
      );
      history.push("/");
    }
  });
  const [resendVerificationLink] = useResendVerificationLinkMutation({
    variables: {
      email: routeQueries.email
    },
    onCompleted: data => {
      history.push({
        pathname: "/email-verification",
        search: queryStringify({
          email: routeQueries.email,
          id: data.resendVerificationLink
        })
      });
    },
    onError: err => errorMessage(err)
  });
  const [getMe] = useMeLazyQuery({
    onCompleted: () => {
      message.success(`Congratulations! Welcome to Taskr`, 2.5);
      history.push({ pathname: "/" });
    }
  });

  const resendVerificationEmail = async () => {
    await resendVerificationLink();
    await message.destroy();
  };

  useEffect(() => {
    let didCancel = false;
    if (!routeQueries.id || !routeQueries.email) {
      history.push("/");
    }

    const fetchData = async () => {
      await register();
    };
    fetchData();
    return () => {
      didCancel = true;
    };
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
