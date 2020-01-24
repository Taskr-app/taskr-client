import React from 'react';
import styles from './Tooltip.module.scss';
import Tooltip, { TooltipProps } from 'antd/lib/tooltip';

export const SmallTooltip: React.FC<TooltipProps> = ({
  children,
  title,
  ...tooltipProps
}) => {
  return (
    <Tooltip
      title={title}
      className={styles.smallTooltip}
      overlayClassName={styles.smallTooltipOverlay}
      {...tooltipProps}
    >
      {children}
    </Tooltip>
  );
};
