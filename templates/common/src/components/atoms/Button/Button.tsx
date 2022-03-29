/**
 *
 * Button
 *
 */
// @flow

// Node_Module Imports
import React from 'react';

// Relative imports
import { AppContainer } from './Button.style';
import { ButtonProps } from './types';

const Button: React.FunctionComponent<ButtonProps> = ({ className, children }) => (
  <AppContainer className={className} data-testid="AppContainer">
    {children}
  </AppContainer>
);

Button.defaultProps = {};
export default Button;
export { Button };
