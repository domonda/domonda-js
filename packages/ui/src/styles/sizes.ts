/**
 *
 * sizes
 *
 */

export type REM = string;

export type Size = 'none' | 'tiny' | 'small' | 'regular' | 'large';
export type Sizes = { [sizing in Size]: REM };
export const SIZES: Size[] = ['none', 'tiny', 'small', 'regular', 'large'];

export interface Sizing {
  (topRightBottomLeft: Size): string;
  (topBottom: Size, rightLeft: Size): string;
  (top: Size, rightLeft: Size, bottom: Size): string;
  (top: Size, right: Size, bottom: Size, left: Size): string;
}

export function createSizing(sizes: Sizes): Sizing {
  return function spacing(...args: Size[]) {
    return args.map((space) => sizes[space]).join(' ');
  };
}
