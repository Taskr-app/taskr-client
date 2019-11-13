import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import ForgotPassword from "./pages/forgot-password";
import ForgotPasswordSuccess from "./pages/forgot-password/success";
import ProjectInvitePublic from "./pages/invite/project/public";
import ProjectInviteSuccess from "./pages/invite/project/success";
import TeamInviteSuccess from "./pages/invite/team/success";
import AuthProvider from "./components/auth/AuthProvider";
import { ModalProvider } from "./components/modals";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <ModalProvider>
        <AuthProvider>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />

            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route
              exact
              path="/forgot-password/success"
              component={ForgotPasswordSuccess}
            />

            <Route
              exact
              path="/invite/project/public"
              component={ProjectInvitePublic}
            />
            <Route
              exact
              path="/invite/project/success"
              component={ProjectInviteSuccess}
            />
            <Route
              exact
              path="/invite/team/success"
              component={TeamInviteSuccess}
            />
          </Switch>
        </AuthProvider>
      </ModalProvider>
    </BrowserRouter>
  );
};

export default Routes;
