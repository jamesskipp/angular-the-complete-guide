export interface WebAppEvent {
  action: string;
  label: string;
  component: {
    name: string;
    parentName: string;
    innerText: string;
    innerHTML: string;
    styles: object;
  };
  page: {
    url: string;
    location: string;
  };
  time: number;
  user: object;
  data: object;
  sessionToken: string;
}
