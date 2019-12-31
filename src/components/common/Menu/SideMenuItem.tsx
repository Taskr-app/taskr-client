import React from 'react';
import { Icon } from 'antd';
import styles from './IconItem.module.scss';

interface Props {
  icon: string;
  label: string;
}

const SideMenuItem: React.FC<Props> = ({ icon, label }) => {
  return (
      <span className={styles.sideMenuItem}>
        <Icon type={icon} style={{ color: '#8491A3' }} />
        <span className={styles.label}>{label}</span>
      </span>
  )
}

export default SideMenuItem;