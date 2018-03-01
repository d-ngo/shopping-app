import { RecipeService } from './recipe.service';
import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  testRecipe : Recipe[];
  testRecipeAsync : Object;

  constructor(private rService : RecipeService) { }

  ngOnInit() {
    this.testRecipe = this.rService.getRecipes();
    this.rService.getRecipeTest()
      .subscribe((data) => {
        this.testRecipeAsync = data;
      })
  }
   
}
