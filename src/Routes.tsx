import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ModalProvider } from "./components/modals";
import AuthProvider from "./components/auth/AuthProvider";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import ForgotPassword from "./pages/forgot-password";
import ForgotPasswordSuccess from "./pages/forgot-password/success";
import ProjectInvitePublic from "./pages/invite/project/public";
import ProjectInviteSuccess from "./pages/invite/project/success";
import TeamInviteSuccess from "./pages/invite/team/success";
import Dashboard from "./pages/dashboard";
import Settings from "./pages/settings"
import EmailVerificationPage from "./pages/email-verification";
import EmailVerificationSuccessPage from "./pages/email-verification/success";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <ModalProvider>
        <AuthProvider>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />

            <Route exact path="/email-verification" component={EmailVerificationPage} />
            <Route exact path="/email-verification/success" component={EmailVerificationSuccessPage} />
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

            <Route exact path="/settings" component={Settings} />
          </Switch>
        </AuthProvider>
      </ModalProvider>
    </BrowserRouter>
  );
};

export default Routes;
