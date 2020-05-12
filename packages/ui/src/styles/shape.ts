/**
 *
 * shape
 *
 */

export type ShapeBorderRadius = 'tiny' | 'small' | 'pill';
export type ShapeBorderRadiuses = { [borderRadius in ShapeBorderRadius]: string };
export const SHAPE_BORDER_RADIUSES: ShapeBorderRadius[] = ['tiny', 'small', 'pill'];

export interface Shape {
  borderRadius: ShapeBorderRadiuses;
}

export function createShape(shape: Shape): Shape {
  return shape;
}
