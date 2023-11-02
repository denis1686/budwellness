import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './ButtonIcon.module.scss';

export default function ButtonIcon(props) {
  const {
    classNames,
    children,
    onClick,
    ...restProps
  } = props;

  return (
    <button
      type="button"
      className={cn(styles.btnIcon, styles[classNames])}
      onClick={onClick}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
    >
      {children}
    </button>
  );
}

ButtonIcon.defaultProps = {
  onClick: () => {},
};

ButtonIcon.propTypes = {
  classNames: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
