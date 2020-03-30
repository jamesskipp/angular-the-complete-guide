import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { RecipesModule } from './modules/recipes/recipes.module';
import { LoggingModule } from './modules/logging/logging.module';
import { ShopppingModule } from './modules/shopping/shopping.module';
import { SharedModule } from './modules/shared/shared.module';
import { CoreModule } from './modules/core/core.module';
import { AuthModule } from './modules/auth/auth.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    AuthModule,
    RecipesModule,
    LoggingModule,
    ShopppingModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
