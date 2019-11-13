import React, { useEffect } from "react";
import Layout from "../../../components/layouts/Layout";
import {
  useMeQuery,
  useAcceptPublicProjectLinkMutation,
  useValidatePublicProjectLinkQuery
} from "../../../generated/graphql";
import AnonLayout from "../../../components/layouts/AnonLayout";
import { errorMessage } from "../../../lib/messageHandler";
import ErrorLayout from "../../../components/layouts/ErrorLayout";
import { useHistory, useParams } from "react-router";
import { queryConcat } from "../../../lib/queryConcat";

interface RouteParams {
  [key: string]: string;
}

const ProjectInvitePublicPage: React.FC = () => {
  const history = useHistory();
  const params = useParams<RouteParams>();
  const { data, loading } = useMeQuery();
  const {
    data: validated,
    loading: validateLoading
  } = useValidatePublicProjectLinkQuery({
    variables: {
      projectId: params.project,
      link: params.id
    },
    onError: err => {
      errorMessage(err);
    }
  });
  const [acceptProjectLink] = useAcceptPublicProjectLinkMutation({
    variables: {
      link: params.id,
      projectId: params.project
    },
    onCompleted: () => history.push({ pathname: "/" }),
    onError: err => errorMessage(err)
  });

  useEffect(() => {
    let didCancel = false;
    if (!params.project || !params.id) {
      history.push("/error", "/");
    }
    if (!loading && data && validated && !validateLoading) {
      const fetchData = async () => {
        await acceptProjectLink();
      };
      fetchData();
    }

    return () => {
      didCancel = true;
    };
  }, [data, validated]);

  const handleSignup = () => {
    history.push({
      pathname: "/register"
    });
  };

  const handleLogin = () => {
    history.push({
      pathname: "/login",
      search: queryConcat({
        returnUrl: "/invite/project/public",
        ...params
      })
    });
  };

  if (!validated && !validateLoading) {
    return (
      <ErrorLayout message={"This link has expired, ask for a new one :D"} />
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

export default ProjectInvitePublicPage;
