import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './components/recipes/recipes.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';

const appRoutes: Routes = [
   {
      path: '',
      pathMatch: 'full',
      redirectTo: '/recipes'
   },
   {
      path: 'recipes',
      component: RecipesComponent
   },
   {
      path: 'shopping-list',
      component: ShoppingListComponent
   },
   {
      path: '**',
      redirectTo: ''
   }
]

@NgModule({
   imports: [
      RouterModule.forRoot(appRoutes)
   ],
   exports: [RouterModule]
})
export class AppRoutingModule { }