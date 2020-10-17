/**
 *
 * shadows
 *
 */

export type Shadow = 'line' | 'small' | 'large';
export type Shadows = { [shadow in Shadow]: string };
export const SHADOWS: Shadow[] = ['line', 'small', 'large'];

export function createShadows(shadows: Shadows): Shadows {
  return shadows;
}
