import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { LoggingModule } from './modules/logging/logging.module';
import { ShopppingModule } from './modules/shopping/shopping.module';
import { SharedModule } from './modules/shared/shared.module';
import { CoreModule } from './modules/core/core.module';
import { StoreModule } from '@ngrx/store';
import { shoppingListReducer } from './modules/shopping/shopping-list/store/shopping-list.reducer';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({
      shoppingList: shoppingListReducer,
    }),
    CoreModule,
    SharedModule,
    LoggingModule,
    ShopppingModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
