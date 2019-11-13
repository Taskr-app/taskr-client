import React, { useState } from "react";
import { useLoginMutation } from "../../generated/graphql";

import { setAccessToken } from "../../lib/accessToken";
import Layout from "../../components/layouts/Layout";
import { Form, Icon, Input, Button } from "antd";
import { FormComponentProps } from "antd/lib/form";
import AuthLayout from "../../components/auth/AuthLayout";
import GoogleLogin from "../../components/auth/GoogleLogin";

import styles from "./Login.module.scss";
import { errorMessage } from "../../lib/messageHandler";
import { useHistory, useParams } from "react-router";
import { queryConcat } from "../../lib/queryConcat";

interface RouteParams {
  [key: string]: string
}

const Login: React.FC<FormComponentProps> = ({ form }) => {
  const history = useHistory();
  const params = useParams<RouteParams>();
  const [forgotPassword, showForgotPassword] = useState(false);
  const [login, { loading }] = useLoginMutation({
    onCompleted: data => {
      setAccessToken(data.login.accessToken);
      if (params.returnUrl) {
        const { returnUrl, ...queryParams } = params;
        history.push({
          pathname: returnUrl as string,
          search: queryConcat({ ...queryParams })
        });
      } else {
        history.push("/");
      }
    },
    onError: err => {
      showForgotPassword(true);
      errorMessage(err);
    }
  });

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { validateFields } = form;
    validateFields(async (validationErrors, { email, password }) => {
      if (!validationErrors) {
        login({
          variables: {
            email,
            password
          }
        });
      }
    });
  };

  const { getFieldDecorator } = form;

  return (
    <Layout dark={1} title="Login | Taskr">
      <AuthLayout>
        <Form onSubmit={handleSubmit}>
          <Form.Item hasFeedback>
            {getFieldDecorator("email", {
              initialValue: params.email ? params.email : "",
              rules: [
                { required: true, message: "Email field is required" },
                { type: "email", message: "Not a a valid email address" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25" }} />
                }
                placeholder="example@email.com"
              />
            )}
          </Form.Item>
          <Form.Item hasFeedback>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Password field is required" },
                { min: 6, message: "Password must be at least 6 characters" }
              ]
            })(
              <Input.Password
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Password"
              />
            )}
          </Form.Item>

          <Form.Item>
            {forgotPassword && (
              <a href="/forgot-password" className={styles.forgotPassword}>
                Forgot your password?
              </a>
            )}
            <Button
              htmlType="submit"
              type="primary"
              style={{ width: "100%" }}
              loading={loading}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
        <GoogleLogin />
      </AuthLayout>
    </Layout>
  );
};

export default Form.create({ name: "login" })(Login);
