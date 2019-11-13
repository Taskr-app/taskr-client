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
import { useHistory, useLocation } from "react-router";
import { queryStringify, queryParse } from "../../../lib/queryParser";

const ProjectInvitePublicPage: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const routeQueries = queryParse(location.search)
  const { data, loading } = useMeQuery();
  const {
    data: validated,
    loading: validateLoading
  } = useValidatePublicProjectLinkQuery({
    variables: {
      projectId: routeQueries.project,
      link: routeQueries.id
    },
    onError: err => {
      errorMessage(err);
    }
  });
  const [acceptProjectLink] = useAcceptPublicProjectLinkMutation({
    variables: {
      link: routeQueries.id,
      projectId: routeQueries.project
    },
    onCompleted: () => history.push({ pathname: "/" }),
    onError: err => errorMessage(err)
  });

  useEffect(() => {
    if (!routeQueries.project || !routeQueries.id) {
      history.push("/");
    }
    if (!loading && data && validated && !validateLoading) {
      const fetchData = async () => {
        await acceptProjectLink();
      };
      fetchData();
    }
  }, [
    data,
    validated,
    validateLoading,
    loading,
    routeQueries,
    history,
    acceptProjectLink
  ]);

  const handleSignup = () => {
    history.push({
      pathname: "/register"
    });
  };

  const handleLogin = () => {
    history.push({
      pathname: "/login",
      search: queryStringify({
        returnUrl: "/invite/project/public",
        ...routeQueries
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
