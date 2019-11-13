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
import { useHistory, useParams } from "react-router";
import { queryConcat } from "../../../lib/queryConcat";

interface RouteParams {
  [key: string]: string
}

/**
 * @route '/invite/team/success
 * @routeQuery { email: string, id: string }
 */

const TeamInviteSuccessPage: React.FC = () => {
  const history = useHistory();
  const params = useParams<RouteParams>();
  const { data, loading } = useMeQuery();
  const { data: validated, loading: validateLoading } = useValidateLinkQuery({
    variables: {
      key: `team-invite-${params.email}`,
      link: params.id
    },
    onError: err => {
      errorMessage(err);
    }
  });
  const [acceptTeamInviteLink] = useAcceptTeamInviteLinkMutation({
    variables: {
      email: params.email,
      teamInviteLink: params.id
    },
    onCompleted: () => {
      history.push({ pathname: "/" });
    },
    onError: err => errorMessage(err)
  });

  useEffect(() => {
    let didCancel = false;
    if (!params.id || !params.email) {
      history.push("/error", "/");
    }

    if (!loading && data && validated && !validateLoading) {
      const fetchData = async () => {
        await acceptTeamInviteLink();
      };
      fetchData();
      return () => {
        didCancel = true;
      };
    }
  }, [data, validated]);

  const handleSignup = () => {
    history.push({
      pathname: "/register",
      search: queryConcat({
        returnUrl: "/invite/team/success",
        registerKey: "team-invite",
        ...params
      })
    });
  };

  const handleLogin = () => {
    history.push({
      pathname: "/login",
      search: queryConcat({
        returnUrl: "/invite/team/success",
        registerKey: "team-invite",
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

export default TeamInviteSuccessPage;
