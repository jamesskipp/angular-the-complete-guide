import { NgModule } from '@angular/core';
import { AlertComponent } from 'src/app/modules/shared/components/alert/alert.component';
import { LoadingSpinnerComponent } from 'src/app/modules/shared/components/loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from 'src/app/modules/shared/directives/placeholder/placeholder.directive';
import { DropdownDirective } from 'src/app/modules/shared/directives/dropdown/dropdown.directive';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from 'src/app/modules/shared/pipes/truncate.pipe';

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective,
    TruncatePipe,
  ],
  imports: [CommonModule],
  exports: [
    AlertComponent,
    PlaceholderDirective,
    DropdownDirective,
    CommonModule,
    LoadingSpinnerComponent,
    TruncatePipe,
  ],
})
export class SharedModule {}
