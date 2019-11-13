import React, { useEffect } from "react";
import Layout from "../../components/layouts/Layout";
import { SubText } from "../../components/common/Text";
import { Button, message, PageHeader, Empty } from "antd";
import { useResendVerificationLinkMutation } from "../../generated/graphql";
import { errorMessage } from "../../lib/messageHandler";
import { useHistory, useParams } from "react-router";
import { queryConcat } from "../../lib/queryConcat";

interface RouteParams {
  [key: string]: string;
}

const EmailVerificationPage = () => {
  const history = useHistory();
  const params = useParams<RouteParams>();
  const [resendVerificationLink] = useResendVerificationLinkMutation({
    variables: {
      email: params.email
    },
    onCompleted: (data) => {
      history.push({
        pathname: "/email-verification",
        search: queryConcat({
          email: params.email,
          id: data.resendVerificationLink
        })
      })
      message.success('Email verification sent')
    },
    onError: (err) => errorMessage(err)
  });

  const resendVerificationEmail = async () => {
    await resendVerificationLink();
  };

  useEffect(() => {
    if (!params.id || !params.email) {
      history.push("/error", "/");
    }
  }, []);

  const goBack = () => history.goBack();

  return (
    <Layout hide={1}>
      <PageHeader title="Thanks for signing up to Taskr" onBack={goBack}>
        <SubText>
          Click on the verification link from your email to confirm your
          verification.
        </SubText>
        <SubText>
          The verification link will be valid for 1 hour. If you did not receive
          one, click on the verification link below.
        </SubText>
      </PageHeader>

      <Empty
        image="/static/email/4x/mobile-chat@4x.png"
        imageStyle={{
          marginTop: "60px"
        }}
        description={
          <span>
            An email has been sent to <b>{params.email}</b> verify your
            account.
          </span>
        }
      >
        <Button type="link" onClick={resendVerificationEmail}>Resend verification link</Button>
      </Empty>
    </Layout>
  );
};

export default EmailVerificationPage;
