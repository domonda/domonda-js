export interface ZIndex {
  appBar: number;
  modal: number;
  tooltip: number;
}

export const defaultZIndex: ZIndex = {
  appBar: 1100,
  modal: 1300,
  tooltip: 1500,
};
