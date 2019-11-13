import React from "react";
import { Skeleton } from "antd";

import { useGetUserProjectsQuery } from "../../generated/graphql";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import DashboardProjects from "../../components/layouts/DashboardLayout/DashboardProjects";
/**
 * Route: '/'
 * Api: Query currentUser's projects / Activity / Cards
 */

const Dashboard = () => {
  const { data, loading } = useGetUserProjectsQuery();
  console.log('Rendering dashboard ? ')
  return (
    <DashboardLayout>
       {
        !loading && data && data.getUserProjects ? (
          <DashboardProjects />
        ) : <Skeleton active />
      }
    </DashboardLayout>
  )
};

export default Dashboard;