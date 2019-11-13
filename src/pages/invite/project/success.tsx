import React, { useEffect } from "react";
import Layout from "../../../components/layouts/Layout";
import {
  useMeQuery,
  useAcceptProjectInviteLinkMutation,
  useValidateLinkQuery
} from "../../../generated/graphql";
import AnonLayout from "../../../components/layouts/AnonLayout";
import ErrorLayout from "../../../components/layouts/ErrorLayout";
import { errorMessage } from "../../../lib/messageHandler";
import { useHistory, useParams } from "react-router";
import { queryConcat } from "../../../lib/queryConcat";

interface RouteParams {
  [key: string]: string;
}

const ProjectInviteSuccessPage: React.FC = () => {
  const history = useHistory();
  const params = useParams<RouteParams>();
  const { data, loading } = useMeQuery();
  const { data: validated, loading: validateLoading } = useValidateLinkQuery({
    variables: {
      key: `project-invite-${params.email}`,
      link: params.id
    },
    onError: err => {
      errorMessage(err)
    }
  });
  const [acceptProjectInviteLink] = useAcceptProjectInviteLinkMutation({
    variables: {
      email: params.email,
      projectInviteLink: params.id
    },
    onCompleted: () => history.push({ pathname: "/" }),
    onError: (err) => errorMessage(err)
  });

  useEffect(() => {
    let didCancel = false;
    if (!params.id || !params.email) {
      history.push("/error", "/");
    }

    if (!loading && data && validated && !validateLoading) {
      const fetchData = async () => {
        await acceptProjectInviteLink();
      };
      fetchData();
    }

    return () => {
      didCancel = true;
    };
  }, [data, validated]);

  const handleSignup = () => {
    history.push({
      pathname: "/register",
      search: queryConcat({
        returnUrl: "/invite/project/success",
        registerKey: "project-invite",
        ...params
      })
    });
  };

  const handleLogin = () => {
    history.push({
      pathname: "/login",
      search: queryConcat({
        returnUrl: "/invite/project/success",
        registerKey: "project-invite",
        ...params
      })
    });
  };

  if (!validated && !validateLoading) {
    return (
      <ErrorLayout message={"This link has expired or has already been used"} />
    );
  }
  if (!loading && !data) {
    return <AnonLayout handleSignup={handleSignup} handleLogin={handleLogin} />;
  }

  return (
    <Layout hide={1}>
      <></>
    </Layout>
  );
};

export default ProjectInviteSuccessPage;
