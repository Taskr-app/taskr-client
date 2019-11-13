import React, { useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import {
  useSendTeamInviteLinkMutation,
  useGetUserTeamQuery
} from "../../generated/graphql";
import { Button, Input, message, Skeleton } from "antd";
import { errorMessage } from "../../lib/messageHandler";
import { decode } from "../../lib/hashids";
import { useLocation } from "react-router";
import { queryParse } from "../../lib/queryParser";

const Team: React.FC = () => {
  const location = useLocation();
  const routeQueries = queryParse(location.search)
  const [value, setValue] = useState("");
  const { data, loading } = useGetUserTeamQuery({
    variables: {
      id: decode(routeQueries.teamId)
    }
  });
  const [sendTeamInviteLink] = useSendTeamInviteLinkMutation({
    onCompleted: () => {
      message.success(`A team invitation has been sent to ${value}`);
    },
    onError: err => errorMessage(err)
  });

  const handleInviteMember = async () => {
    await sendTeamInviteLink({
      variables: {
        teamId: routeQueries.teamId,
        email: value
      }
    });
  };

  if (!loading && !data) {
    return null;
  }
  if (loading || !data) {
    return (
      <DashboardLayout>
        <Skeleton active />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Input value={value} onChange={e => setValue(e.currentTarget.value)} />
      <Button onClick={handleInviteMember}>Invite member</Button>
    </DashboardLayout>
  );
};

export default Team;
