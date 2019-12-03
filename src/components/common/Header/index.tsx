import React from 'react';
import { useMeQuery, useLogoutMutation } from '../../../generated/graphql';
import classNames from 'classnames';
import { Layout, Row, Col, Dropdown, Menu, Icon } from 'antd';
import styles from './Header.module.scss';
import { ButtonLink } from '../Button';
import AnonHeader from './AnonHeader';
import { setAccessToken } from '../../../lib/accessToken';
import { useHistory } from 'react-router';
import { DefaultUserAvatar } from '../Avatar';
import NotificationsIcon from './NotificationsIcon';
import CreateIcon from './CreateIcon';

interface Props {
  dark?: number;
}

export const Header: React.FC<Props> = ({ dark }) => {
  const history = useHistory();
  const { data } = useMeQuery();
  const [logout, { client }] = useLogoutMutation({
    onCompleted: async () => {
      setAccessToken('');
      await client!.clearStore();
      history.push('/login');
    }
  });

  const headerStyle = classNames(styles.header, {
    [styles.dark]: dark
  });

  if (!data || !data.me) {
    return <AnonHeader dark={dark} />;
  }

  const handleMenuClick = async ({ key }: { key: string }) => {
    switch (key) {
      case 'settings': {
        history.push('/settings');
        break;
      }
      case 'logout': {
        logout();
        break;
      }

      default:
        return;
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item disabled>
        {data.me.username} ({data.me.email})
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key='settings'>
        <span>
          <Icon type='setting' />
          <span>Settings</span>
        </span>
      </Menu.Item>
      <Menu.Item key='logout'>
        <span>
          <Icon type='logout' />
          <span>Log out</span>
        </span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout.Header className={headerStyle}>
      <Row>
        <Col span={8}>
          <Row>
            <Col span={4}>
              <ButtonLink path='/'>
                <img
                  src={`${process.env.PUBLIC_URL}/logo/header.png`}
                  alt='Home'
                  height={16}
                />
              </ButtonLink>
            </Col>
          </Row>
        </Col>
        <Col span={16}>
          <Row type='flex' justify='end'>
            <Col span={2}>
              <CreateIcon />
            </Col>
            <Col span={2}>
              {data.me && <NotificationsIcon user={data.me} />}
            </Col>
            <Col span={2}>
              <Dropdown overlay={menu} placement='bottomRight'>
                <div className={styles.avatarContainer}>
                  <DefaultUserAvatar user={data.me} />
                </div>
              </Dropdown>
            </Col>
          </Row>
        </Col>
      </Row>
    </Layout.Header>
  );
};
