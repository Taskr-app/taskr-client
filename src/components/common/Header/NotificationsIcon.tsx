import React, { useEffect } from 'react';
import { Badge, Dropdown, Avatar, Icon, Menu } from 'antd';
import {
  useGetNotificationsQuery,
  NewNotificationDocument,
  User
} from '../../../generated/graphql';

interface Props {
  user: Pick<User, 'id' | 'username' | 'email'>;
}

const NotificationsIcon: React.FC<Props> = ({ user }) => {
  const { data, subscribeToMore } = useGetNotificationsQuery();
  useEffect(() => {
    subscribeToMore({
      document: NewNotificationDocument,
      variables: { userId: user.id },
      updateQuery: (prev, { subscriptionData }: any) => {
        if (!subscriptionData.data) return prev;
        const newNotification = subscriptionData.data.newNotification;

        return {
          ...prev,
          getNotifications: [newNotification, ...prev.getNotifications]
        };
      }
    });
  }, []);
  const notifications = (data && data.getNotifications) || [];

    const menu = (
      <Menu>
        {notifications.map(notification => {
          return (
            <Menu.Item key={notification.id}>
              {notification.type}
            </Menu.Item>
          )
        })}
      </Menu>
    )
  return (
    <Dropdown overlay={menu}>
      <Badge count={notifications.length}>
        <Avatar
          icon={<Icon type='bell' theme='filled' />}
          style={{ color: 'rgba(0, 0, 0, 0.65)' }}
        />
      </Badge>
    </Dropdown>
  );
};

export default NotificationsIcon;
