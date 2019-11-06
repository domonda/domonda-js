/**
 *
 * shadows
 *
 */

export type Shadow = 'line' | 'doubleLine' | 'small' | 'large';
export type Shadows = { [shadow in Shadow]: string };
export const SHADOWS: Shadow[] = ['line', 'doubleLine', 'small', 'large'];

export function createShadows(shadows: Shadows): Shadows {
  return shadows;
}
