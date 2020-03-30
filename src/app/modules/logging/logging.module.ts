import { NgModule } from '@angular/core';
import { ClickLoggerDirective } from './click-logger/click-logger.directive';
import { LoggingService } from './logging.service';

@NgModule({
  declarations: [ClickLoggerDirective],
  exports: [ClickLoggerDirective],
  providers: [LoggingService],
})
export class LoggingModule {}
