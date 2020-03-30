import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/app/modules/recipes/models/recipe.model';
import { RecipeService } from 'src/app/modules/recipes/services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.setRecipe(params.id);
    });
    // Different Approach:
    // this.recipeService.selectedRecipeChanged.subscribe((recipe: Recipe) => {
    //   this.recipe = recipe;
    // });
  }

  onClickToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  setRecipe(id: string) {
    // this.recipeService.fetchRecipe(id).subscribe((recipe: Recipe) => {
    //   this.recipe = recipe;
    // });
    this.recipe = this.recipeService.findRecipe(id);
  }

  onClickDelete() {
    this.recipeService.removeRecipe(this.recipe.id);
    this.router.navigate(['/recipes']);
  }
}
