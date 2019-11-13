import React from "react";

import styles from "./Button.module.scss";
import { NavLink } from "react-router-dom";

interface ButtonLinkProps {
  path: string;
}

export const ButtonLink: React.FC<ButtonLinkProps> = ({
  path,
  children,
  ...buttonProps
}) => {
  return (
    <NavLink to={path}>
      <button className={styles.buttonLink} {...buttonProps}>
        {children}
      </button>
    </NavLink>
  );
};
