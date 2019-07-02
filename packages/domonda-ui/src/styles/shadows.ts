const shadowKeyUmbraOpacity = 0.15;
const shadowKeyPenumbraOpacity = 0.1;
const shadowAmbientShadowOpacity = 0.05;

export function createShadow(
  px0: number,
  px1: number,
  px2: number,
  px3: number,
  px4: number,
  px5: number,
  px6: number,
  px7: number,
  px8: number,
  px9: number,
  px10: number,
  px11: number,
): string {
  return [
    `${px0}px ${px1}px ${px2}px ${px3}px rgba(0,0,0,${shadowKeyUmbraOpacity})`,
    `${px4}px ${px5}px ${px6}px ${px7}px rgba(0,0,0,${shadowKeyPenumbraOpacity})`,
    `${px8}px ${px9}px ${px10}px ${px11}px rgba(0,0,0,${shadowAmbientShadowOpacity})`,
  ].join(',');
}

export type Shadows = ['none', string, string, string, string, string];

export const defaultShadows: Shadows = [
  'none',
  createShadow(0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 2, -1),
  createShadow(0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 2, 1),
  createShadow(0, 0, 0, 0, 0, 6, 6, 0, 3, 1, 12, 1),
  createShadow(0, 0, 0, 0, 0, 0, 12, 1, 0, 0, 0, 0),
  createShadow(0, 0, 0, 0, 0, 0, 3, -1, 0, 2, 3, 1),
];
