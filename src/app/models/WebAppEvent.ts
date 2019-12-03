export class WebAppEvent {
   constructor(
      private action: string,
      private label: string,
      private component: string,
      private time: number,
      private user: object,
      private data: object
   ) { }
}