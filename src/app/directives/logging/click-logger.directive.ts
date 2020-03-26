import {
  Directive,
  HostListener,
  Input,
  ViewContainerRef,
} from '@angular/core';
import { LoggingService } from 'src/app/services/logging.service';

@Directive({
  selector: '[clickLogger]',
})
export class ClickLoggerDirective {
  @Input('clickLogger') _elementLabelShorthand: string;
  @Input('elementLabel') _elementLabel: string;
  @Input('loggerData') data: object;

  constructor(
    private loggingService: LoggingService,
    private vc: ViewContainerRef
  ) {}

  get elementLabel(): string {
    return this._elementLabelShorthand || this._elementLabel;
  }

  get componentName(): string {
    if (this.vc['_view']) {
      return this.vc['_view'].component.constructor.name;
    } else {
      return ''; // none Angular component
    }
  }

  @HostListener('click', ['$event'])
  click(event: Event): void {
    this.loggingService.addEvent({
      action: 'click',
      label: this.elementLabel,
      componentName: this.componentName,
      time: Date.now(),
      user: null,
      data: this.data,
    });
  }
}
