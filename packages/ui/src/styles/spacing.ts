/**
 *
 * spacing
 *
 */

export type Space = 'none' | 'tiny' | 'small' | 'medium' | 'large';
export type Spaces = { [spacing in Space]: number };
export const SPACES: Space[] = ['none', 'tiny', 'small', 'medium', 'large'];
export const SPACE_PREFIX = 'spacing-';

export interface Spacing {
  (top: Space, right: Space, bottom: Space, left: Space): string;
  (top: Space, rightLeft: Space, bottom: Space): string;
  (topBottom: Space, rightLeft: Space): string;
  (topRightBottomLeft: Space): number;
}

export function createSpacing(spaces: Spaces): Spacing {
  return function spacing(topRightBottomLeft: Space, ...rest: Space[]) {
    if (rest.length === 0) {
      return spaces[topRightBottomLeft] as any; // <- we use any here even though the type is `number`, but TS...
    }
    return [topRightBottomLeft, ...rest].map((space) => spaces[space] + 'px').join(' ');
  };
}
