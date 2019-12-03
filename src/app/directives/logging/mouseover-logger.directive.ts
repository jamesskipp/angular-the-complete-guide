import { Directive, HostListener, Input, ViewContainerRef } from '@angular/core';
import { LoggingService } from 'src/app/services/logging.service';

@Directive({
   selector: '[mouseoverLogger]'
})
export class MouseoverLoggerDirective {

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

   @HostListener('mouseover', ['$event'])
   click(event: Event) {
      this.loggingService.addEvent({
         action: 'mouseover',
         label: this.elementLabel,
         component: this.component,
         time: Date.now(),
         user: null
      });
   }
}
