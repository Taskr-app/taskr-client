import React from "react";
import { useMeQuery } from "../../generated/graphql";
import { useLocation, Redirect } from "react-router";

interface Props {
  children: React.ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  const { data, loading } = useMeQuery();

  const anonList = [
    "/invite/team/success",
    "/invite/project/success",
    "/invite/project/public"
  ];

  const whiteList = [
    "/login",
    "/register",
    "/home",
    "/forgot-password",
    "/forgot-password/success",
    "/google",
    "/email-verification",
    "/email-verification/success"
  ];

  if (loading) {
    // TODO: add load screen
    return <></>;
  }

  if (data && whiteList.includes(location.pathname)) {
    console.log('Tried to access a whitelisted page...routing to push')
    document.title="Taskr"
    return <Redirect push to="/" />
  }

  // not authenticated, redirect unless it's in whiteList
  if (
    !data &&
    !whiteList.includes(location.pathname) &&
    !anonList.includes(location.pathname)
  ) {
    document.title="Login | Taskr"
    return <Redirect to="/login" />
  }
  return <>{children}</>;
};

export default AuthProvider;
