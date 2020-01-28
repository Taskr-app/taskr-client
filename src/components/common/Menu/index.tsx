import React from 'react';
import styles from './Menu.module.scss'
import { useHistory } from 'react-router-dom';

interface NavMenuProps {
  options: [NavOptions]
}

type NavOptions = {
  key: string,
  route: string,
  label?: string
}

export const Menu = () => {
  return (
    <div className={styles.menu}>Menu</div>
  )
}

export const NavMenu: React.FC<NavMenuProps> = ({ options }) => {
  const history = useHistory();
  return (
    <div className={styles.navMenu}>
      {options.map(({ key, route, label }) => {
        return (
          <div key={key} onClick={() => history.push(route)}>
            {label ? label : key}
          </div>
        )
      })}
    </div>
  )
}