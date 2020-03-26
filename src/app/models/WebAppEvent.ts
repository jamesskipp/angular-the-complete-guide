export interface WebAppEvent {
  action: string;
  label: string;
  componentName: string;
  time: number;
  user: object;
  data: object;
}
