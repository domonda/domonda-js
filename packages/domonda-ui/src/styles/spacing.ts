/**
 *
 * spacing
 *
 */

export type Space = 'none' | 'tiny' | 'small' | 'default' | 'large';
export type Spaces = { [spacing in Space]: number };
export const SPACES: Space[] = ['tiny', 'small', 'default', 'large'];

export interface Spacing {
  (top: Space, right: Space, bottom: Space, left: Space): string;
  (top: Space, rightLeft: Space, bottom: Space): string;
  (topBottom: Space, rightLeft: Space): string;
  (topRightBottomLeft: Space): string;
}

export function createSpacing(spaces: Spaces): Spacing {
  return function spacing(topRightBottomLeft: Space, ...rest: Space[]) {
    if (rest.length === 0) {
      return spaces[topRightBottomLeft] + 'px';
    }
    return [topRightBottomLeft, ...rest].map((space) => spaces[space] + 'px').join(' ');
  };
}
