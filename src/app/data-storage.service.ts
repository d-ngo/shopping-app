import { AuthService } from './auth/auth.service';
import { Recipe } from './recipes/recipe.model';
import { RecipeService } from './recipes/recipe.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class DataStorageService {

  constructor(
    private _http : HttpClient, 
    private recipeService : RecipeService,
    private authService : AuthService
  ) { }
  
  getRecipes() {
    const token = this.authService.getToken();
    return this._http.get<Recipe[]>('https://dngo-shopping-app.firebaseio.com/recipes.json?auth='+token).map(
      (recipes) => {
        for (let recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return recipes;
      }
    );
  }
  
  storeRecipes() {
    const token = this.authService.getToken();
    return this._http.put(
      'https://dngo-shopping-app.firebaseio.com/recipes.json?auth='+token, 
      this.recipeService.getRecipes()
    );
  }
}
