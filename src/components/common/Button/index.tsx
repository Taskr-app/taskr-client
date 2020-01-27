import React from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';
import { NavLink } from 'react-router-dom';
import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';

interface ButtonLinkProps {
  path: string;
  type?: 'default' | 'primary';
}

/**
 *
 * @param path Route pathname for `NavLink`, ie. '/projects/2'
 * @param type (default | primary). defaults to default
 */

export const ButtonLink: React.FC<ButtonLinkProps> = ({
  path,
  children,
  type = 'default',
  ...buttonProps
}) => {
  const style = classNames(styles.buttonLink, {
    [styles.primary]: type === 'primary'
  });

  return (
    <NavLink to={path}>
      <button className={style} {...buttonProps}>
        {children}
      </button>
    </NavLink>
  );
};

export const BackButton: React.FC<ButtonProps> = ({
  children,
  ...buttonProps
}) => {
  return (
    <Button {...buttonProps}>
      <span className={styles.backButtonInner}>
        <i className='icon icon-arrow-left' />
        {children}
      </span>
    </Button>
  );
};
