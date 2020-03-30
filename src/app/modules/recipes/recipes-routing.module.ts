import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './components/recipes/recipes.component';
import { AuthGuard } from 'src/app/modules/auth/guards/auth.guard';
import { RecipeStartComponent } from './components/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './components/recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { RecipesResolver } from 'src/app/modules/recipes/resolvers/recipes.resolver';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: RecipeStartComponent,
      },
      {
        path: 'create',
        component: RecipeEditComponent,
      },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: [RecipesResolver],
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [RecipesResolver],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
