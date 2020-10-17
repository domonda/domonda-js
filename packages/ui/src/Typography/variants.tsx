/**
 *
 * variants
 *
 */

import React from 'react';
import { Typography, TypographyProps } from './Typography';

export type VariantProps = Omit<TypographyProps, 'variant'>;

export const H1: React.FC<VariantProps> = ({ children, ...rest }) => (
  <Typography {...rest} variant="h1">
    {children}
  </Typography>
);

export const H2: React.FC<VariantProps> = ({ children, ...rest }) => (
  <Typography {...rest} variant="h2">
    {children}
  </Typography>
);

export const H3: React.FC<VariantProps> = ({ children, ...rest }) => (
  <Typography {...rest} variant="h3">
    {children}
  </Typography>
);

export const H4: React.FC<VariantProps> = ({ children, ...rest }) => (
  <Typography {...rest} variant="h4">
    {children}
  </Typography>
);

export const H5: React.FC<VariantProps> = ({ children, ...rest }) => (
  <Typography {...rest} variant="h5">
    {children}
  </Typography>
);

export const H6: React.FC<VariantProps> = ({ children, ...rest }) => (
  <Typography {...rest} variant="h6">
    {children}
  </Typography>
);

export const P: React.FC<VariantProps> = ({ children, ...rest }) => (
  <Typography {...rest} variant="p">
    {children}
  </Typography>
);

export const Label: React.FC<VariantProps> = ({ children, ...rest }) => (
  <Typography {...rest} variant="label">
    {children}
  </Typography>
);

export const Small: React.FC<VariantProps> = ({ children, ...rest }) => (
  <Typography {...rest} variant="small">
    {children}
  </Typography>
);

export const Pre: React.FC<VariantProps> = ({ children, ...rest }) => (
  <Typography {...rest} variant="pre">
    {children}
  </Typography>
);

export const Var: React.FC<VariantProps> = ({ children, ...rest }) => (
  <Typography {...rest} variant="var">
    {children}
  </Typography>
);
