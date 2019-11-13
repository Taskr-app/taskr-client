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
import { useHistory, useLocation } from "react-router";
import { queryStringify, queryParse } from "../../../lib/queryParser";

const ProjectInviteSuccessPage: React.FC = () => {
  const history = useHistory();
  const location = useLocation()
  const routeQueries = queryParse(location.search)
  const { data, loading } = useMeQuery();
  const { data: validated, loading: validateLoading } = useValidateLinkQuery({
    variables: {
      key: `project-invite-${routeQueries.email}`,
      link: routeQueries.id
    },
    onError: err => {
      errorMessage(err)
    }
  });
  const [acceptProjectInviteLink] = useAcceptProjectInviteLinkMutation({
    variables: {
      email: routeQueries.email,
      projectInviteLink: routeQueries.id
    },
    onCompleted: () => history.push({ pathname: "/" }),
    onError: (err) => errorMessage(err)
  });

  useEffect(() => {
    if (!routeQueries.id || !routeQueries.email) {
      history.push("/");
    }

    if (!loading && data && validated && !validateLoading) {
      const fetchData = async () => {
        await acceptProjectInviteLink();
      };
      fetchData();
    }
  }, [data, validated, history, routeQueries, loading, validateLoading, acceptProjectInviteLink]);

  const handleSignup = () => {
    history.push({
      pathname: "/register",
      search: queryStringify({
        returnUrl: "/invite/project/success",
        registerKey: "project-invite",
        ...routeQueries
      })
    });
  };

  const handleLogin = () => {
    history.push({
      pathname: "/login",
      search: queryStringify({
        returnUrl: "/invite/project/success",
        registerKey: "project-invite",
        ...routeQueries
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
