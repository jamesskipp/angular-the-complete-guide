import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormControlDirective,
  FormArray,
} from '@angular/forms';
import { RecipeService } from 'src/app/modules/recipes/services/recipe.service';
import { Recipe } from 'src/app/modules/recipes/models/recipe.model';
import { generate } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id: string;
  editMode = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      this.editMode = params.id != null;

      if (this.editMode) {
        this.recipeService.fetchRecipe(this.id).subscribe((recipe) => {
          this.initForm(recipe);
        });
      }
    });

    this.initForm({});
  }

  private async initForm(recipe) {
    const recipeName = recipe.name || '';
    const recipeImagePath = recipe.imagePath || '';
    const recipeDescription = recipe.description || '';
    const recipeIngredients = new FormArray([]);

    if (recipe.ingredients) {
      recipe.ingredients.forEach((ingredient) => {
        recipeIngredients.push(this.generateNewIngredientControl(ingredient));
      });
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients,
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, {
        id: this.id,
        ...this.recipeForm.value,
      });
    } else {
      this.recipeService.addRecipe({
        id: Date.now().toString(),
        ...this.recipeForm.value,
      });
    }
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onClickAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      this.generateNewIngredientControl({})
    );
  }

  generateNewIngredientControl(ingredient) {
    return new FormGroup({
      name: new FormControl(ingredient.name, Validators.required),
      amount: new FormControl(ingredient.amount, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/),
      ]),
      unit: new FormControl(ingredient.unit, Validators.required),
    });
  }

  exit(id: string) {
    this.router.navigate(['/recipes' + (id ? '/' + id : '')]);
  }

  onClickDelete() {
    this.recipeService.removeRecipe(this.id);
    this.exit('');
  }

  onClickCancel() {
    this.exit(this.id);
  }

  onClickRemoveIngredient(index: number) {
    this.controls.splice(index, 1);
  }
}
