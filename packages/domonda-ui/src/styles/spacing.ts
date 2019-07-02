export type SpacingOptions = number;
export type SpacingArgument = number;

export interface Spacing {
  (): string;
  (value1: SpacingArgument): string;
  (value1: SpacingArgument, value2: SpacingArgument): string;
  (value1: SpacingArgument, value2: SpacingArgument, value3: SpacingArgument): string;
  (
    value1: SpacingArgument,
    value2: SpacingArgument,
    value3: SpacingArgument,
    value4: SpacingArgument,
  ): string;
}

const multiply = (base: number) => (factor: number) => base * factor;

export function createSpacing(initialSpacing: SpacingOptions): Spacing {
  const multiplyByFactor = multiply(initialSpacing);

  return function spacing(...args: number[]): string {
    if (args.length === 0) return `${initialSpacing}px`;
    if (args.length === 1 && typeof args[0] === 'number') return `${multiplyByFactor(args[0])}px`;

    return args
      .map((factor) => {
        const output = multiplyByFactor(factor);
        return typeof output === 'number' ? `${output}px` : output;
      })
      .join(' ');
  };
}
