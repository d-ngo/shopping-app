import { Subject } from 'rxjs/Subject';
import { Ingredient } from './../shared/ingredient.model';
import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  recipes: Recipe[] = [
    new Recipe(
      'Chicken Masala', 
      'This is delicious', 
      'http://cdn-image.myrecipes.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/slow-cooker-chicken-tikka-masala-ck.jpg?itok=iQg1qs0B', 
      [
        new Ingredient('Chicken breast' , 4),
        new Ingredient('Sauce', 1)
      ]
    ),
    new Recipe(
      'Big Fat Burger', 
      'BURGERRRRR', 
      'http://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg', 
      [
        new Ingredient('Lean Ground Beef', 2),
        new Ingredient('Buns', 2),
        new Ingredient('Cheese', 1)
      ]
    )
  ];
  
  constructor(private shoppingListService : ShoppingListService, private _http : HttpClient) { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(newRecipe: Recipe, index: number) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipeTest() {
    return this._http.get('https://jsonplaceholder.typicode.com/posts');
  }
}
