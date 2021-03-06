import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './modules/auth/guards/auth.guard';

const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/recipes',
  },
  {
    path: 'recipes',
    canActivate: [AuthGuard],
    loadChildren: () => {
      return import('./modules/recipes/recipes.module').then(
        (m) => m.RecipesModule
      );
    },
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
  imports: [
    RouterModule.forRoot(appRoutes, {
      preloadingStrategy: PreloadAllModules,
      enableTracing: false,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
