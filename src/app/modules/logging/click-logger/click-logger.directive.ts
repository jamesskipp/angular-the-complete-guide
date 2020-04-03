import {
  Directive,
  HostListener,
  Input,
  ViewContainerRef,
  ElementRef,
} from '@angular/core';
import { LoggingService } from 'src/app/modules/logging/logging.service';

@Directive({
  selector: '[clickLogger]',
})
export class ClickLoggerDirective {
  @Input('clickLogger') _elementLabelShorthand: string;
  @Input('elementLabel') _elementLabel: string;
  @Input('loggerData') data: object;

  constructor(private loggingService: LoggingService, private el: ElementRef) {}

  get elementLabel(): string {
    return this._elementLabelShorthand || this._elementLabel;
  }

  @HostListener('click', ['$event'])
  click(event: Event): void {
    this.loggingService.addEvent({
      action: 'click',
      label: this.elementLabel,
      component: {
        name: [
          this.el.nativeElement.localName,
          ...this.el.nativeElement.classList,
        ].join('.'),
        innerText: this.el.nativeElement.innerText,
        innerHTML: this.el.nativeElement.innerHTML,
        parentName: [
          this.el.nativeElement.parentNode.localName,
          ...this.el.nativeElement.parentNode.classList,
        ].join('.'),
        styles: this.computeStyles(this.el.nativeElement),
      },
      data: this.data,
    });
  }

  private computeStyles(el: Element): object {
    const styles = {};
    const domStyles = getComputedStyle(el);
    for (let i = 0; i < domStyles.length; i++) {
      const key = domStyles[i];
      const value = domStyles[key];
      styles[key] = value;
    }
    return styles;
  }
}
