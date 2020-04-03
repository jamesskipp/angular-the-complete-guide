export interface WebAppEvent {
  action: string;
  label: string;
  page: {
    url: string;
    location: string;
    title: string;
  };
  time: number;
  component?: {
    name: string;
    parentName: string;
    innerText: string;
    innerHTML: string;
    styles: object;
  };
  user?: object;
  data?: object;
  sessionToken?: string;
}
