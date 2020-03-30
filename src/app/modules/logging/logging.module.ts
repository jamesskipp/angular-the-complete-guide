import { NgModule } from '@angular/core';
import { ClickLoggerDirective } from './click-logger/click-logger.directive';

@NgModule({
  declarations: [ClickLoggerDirective],
  exports: [ClickLoggerDirective],
})
export class LoggingModule {}
