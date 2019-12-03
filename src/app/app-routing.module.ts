import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './components/recipes/recipes.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { RecipeDetailComponent } from './components/recipes/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';

const appRoutes: Routes = [
   {
      path: '',
      pathMatch: 'full',
      redirectTo: '/recipes'
   },
   {
      path: 'recipes',
      component: RecipesComponent,
      children: [
         {
            path: '',
            component: RecipeStartComponent
         },
         {
            path: 'create',
            component: RecipeEditComponent
         },
         {
            path: ':id',
            component: RecipeDetailComponent
         },
         {
            path: ':id/edit',
            component: RecipeEditComponent
         }
      ]
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