/**
 *
 * transition
 *
 */

// Follow https://material.google.com/motion/duration-easing.html#duration-easing-natural-easing-curves
// to learn the context in which each easing should be used.
export interface Easing {
  // This is the most common easing curve.
  easeInOut: string;
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: string;
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: string;
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: string;
}

export const defaultEasing: Easing = {
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
};

// Follow https://material.io/guidelines/motion/duration-easing.html#duration-easing-common-durations
// to learn when use what timing
export interface Duration {
  shortest: number;
  shorter: number;
  short: number;
  // most basic recommended timing
  standard: number;
  // this is to be used in complex animations
  complex: number;
  // recommended when something is entering screen
  enteringScreen: number;
  // recommended when something is leaving screen
  leavingScreen: number;
}

export const defaultDuration: Duration = {
  shortest: 150,
  shorter: 200,
  short: 250,
  standard: 300,
  complex: 375,
  enteringScreen: 225,
  leavingScreen: 195,
};

export const formatMs = (milliseconds: number) => `${Math.round(milliseconds)}ms`;

export interface Transition {
  easing: Easing;
  duration: Duration;
  create: (
    props: string | string[],
    options?: Partial<{
      duration: number | string;
      easing: string;
      delay: number | string;
    }>,
  ) => string;
  getAutoHeightDuration: (height: number) => number;
}

export const defaultTransition: Transition = {
  easing: defaultEasing,
  duration: defaultDuration,
  create: (props, options = {}) => {
    const {
      duration = defaultDuration.standard,
      easing = defaultEasing.easeInOut,
      delay = 0,
    } = options;

    return (Array.isArray(props) ? props : [props])
      .map(
        (animatedProp) =>
          `${animatedProp} ${
            typeof duration === 'string' ? duration : formatMs(duration)
          } ${easing} ${typeof delay === 'string' ? delay : formatMs(delay)}`,
      )
      .join(',');
  },
  getAutoHeightDuration(height) {
    if (!height) {
      return 0;
    }

    const constant = height / 36;

    // https://www.wolframalpha.com/input/?i=(4+%2B+15+*+(x+%2F+36+)+**+0.25+%2B+(x+%2F+36)+%2F+5)+*+10
    return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
  },
};

export const reflow = (node: HTMLElement) => node.scrollTop;
