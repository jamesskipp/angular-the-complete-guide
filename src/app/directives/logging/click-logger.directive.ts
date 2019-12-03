import { Directive, HostListener, Input, ViewContainerRef } from '@angular/core';
import { LoggingService } from 'src/app/services/logging.service';

@Directive({
   selector: '[clickLogger]'
})
export class ClickLoggerDirective {

   @Input('clickLogger') _elementLabelShorthand: string;
   @Input('elementLabel') _elementLabel: string;

   constructor(private loggingService: LoggingService,
      private vc: ViewContainerRef) { }

   get elementLabel() {
      return this._elementLabelShorthand || this._elementLabel;
   }

   get component() {
      return this.vc['_view'].component.constructor.name;
   }

   @HostListener('click', ['$event'])
   click(event: Event) {
      this.loggingService.addEvent({
         action: 'click',
         label: this.elementLabel,
         component: this.component,
         time: Date.now(),
         user: null
      });
   }
}
