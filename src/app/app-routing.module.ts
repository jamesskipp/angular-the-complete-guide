import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/recipes',
  },
  {
    path: 'recipes',
    loadChildren: () =>
      import('./modules/recipes/recipes.module').then((m) => m.RecipesModule),
  },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'shopping-list',
    loadChildren: () =>
      import('./modules/shopping/shopping.module').then(
        (m) => m.ShopppingModule
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
