import React from "react";
import { Layout, Row, Col, Button } from "antd";
import { NavLink } from "react-router-dom";
import classNames from "classnames";

import styles from "./Header.module.scss";

interface Props {
  dark?: number;
}

const AnonHeader: React.FC<Props> = ({ dark }) => {
  // const router = useRouter();
  const headerStyle = classNames(styles.header, {
    [styles.dark]: dark
  });
  return (
    <Layout.Header className={headerStyle}>
      <Row>
        <Col span={8}>
          <Row>
            <Col span={4}>
              <NavLink to="/home">
                <Button type="link" ghost={dark ? true : false}>
                  <img
                    src={`${process.env.PUBLIC_URL}/logo/header-white.png`}
                    alt="Home"
                    height={16}
                  />
                </Button>
              </NavLink>
            </Col>
          </Row>
        </Col>
        <Col span={16}>
          <Row type="flex" justify="end">
            <Col span={3}>
              <NavLink
                // to={{ pathname: "/login", query: { ...router.query } }}
                to={{ pathname: "/login" }}
              >
                <Button type="link" ghost={dark ? true : false}>
                  Login
                </Button>
              </NavLink>
            </Col>
            <Col span={3}>
              <NavLink
                // href={{ pathname: "/register", query: { ...router.query } }}
                to={{ pathname: "/register" }}
              >
                <Button type="link" ghost={dark ? true : false}>
                  Signup
                </Button>
              </NavLink>
            </Col>
          </Row>
        </Col>
      </Row>
    </Layout.Header>
  );
};

export default AnonHeader;
