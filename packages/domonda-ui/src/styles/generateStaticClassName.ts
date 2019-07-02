import { jss } from './jss';

const staticClassNames: Record<string, string> = {};

export function generateStaticClassName(key: string | React.ComponentType<any>): string {
  // if the key is not a string, its a component
  if (!(typeof key === 'string')) {
    key = key.displayName || key.name;
  }

  // the key has to exist, it cannot be auto-magically derived
  if (!key) {
    console.warn(
      'domonda-ui: cannot generate static class name for anonymous functions or empty keys',
    );
  }

  // look if the static class name is already generated, if not, generate it
  if (!staticClassNames[key]) {
    // NOTE: `generateId` does indeed exist in the JSS instance
    staticClassNames[key] = (jss as any).generateId({ key });
  }

  return staticClassNames[key];
}
