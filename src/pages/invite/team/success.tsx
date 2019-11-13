import React, { useEffect } from "react";
import Layout from "../../../components/layouts/Layout";
import {
  useMeQuery,
  useAcceptTeamInviteLinkMutation,
  useValidateLinkQuery
} from "../../../generated/graphql";
import AnonLayout from "../../../components/layouts/AnonLayout";
import { errorMessage } from "../../../lib/messageHandler";
import ErrorLayout from "../../../components/layouts/ErrorLayout";
import { useHistory, useLocation } from "react-router";
import { queryStringify, queryParse } from "../../../lib/queryParser";

/**
 * @route '/invite/team/success
 * @routeQuery { email: string, id: string }
 */

const TeamInviteSuccessPage: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const routeQueries = queryParse(location.search)
  const { data, loading } = useMeQuery();
  const { data: validated, loading: validateLoading } = useValidateLinkQuery({
    variables: {
      key: `team-invite-${routeQueries.email}`,
      link: routeQueries.id
    },
    onError: err => {
      errorMessage(err);
    }
  });
  const [acceptTeamInviteLink] = useAcceptTeamInviteLinkMutation({
    variables: {
      email: routeQueries.email,
      teamInviteLink: routeQueries.id
    },
    onCompleted: () => {
      history.push({ pathname: "/" });
    },
    onError: err => errorMessage(err)
  });

  useEffect(() => {
    if (!routeQueries.id || !routeQueries.email) {
      history.push("/");
    }

    if (!loading && data && validated && !validateLoading) {
      const fetchData = async () => {
        await acceptTeamInviteLink();
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
    acceptTeamInviteLink
  ]);

  const handleSignup = () => {
    history.push({
      pathname: "/register",
      search: queryStringify({
        returnUrl: "/invite/team/success",
        registerKey: "team-invite",
        ...routeQueries
      })
    });
  };

  const handleLogin = () => {
    history.push({
      pathname: "/login",
      search: queryStringify({
        returnUrl: "/invite/team/success",
        registerKey: "team-invite",
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

export default TeamInviteSuccessPage;
