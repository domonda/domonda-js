export * from 'treat';
import { Theme as ThisTheme } from './styles/theme';

declare module 'treat/theme' {
  export interface Theme extends ThisTheme {}
}
