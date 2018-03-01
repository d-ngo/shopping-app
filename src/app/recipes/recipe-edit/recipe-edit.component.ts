import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Recipe } from './../recipe.model';
import { RecipeService } from './../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private router: Router, private activatedRoute : ActivatedRoute, private recipeService : RecipeService) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        })
  }

  private initForm() {
    let rName : String = '', rImgPath : String = '', rDescription : String = '', rIngredients = new FormArray([]);
    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      rName = recipe.name;
      rImgPath = recipe.imgPath;
      rDescription = recipe.description;
      if (recipe.ingredients) {
        for (let ingredient of recipe.ingredients) {
          rIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[0-9]+[1-9]*$/)])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name' : new FormControl(rName, Validators.required),
      'imgPath' : new FormControl(rImgPath, Validators.required),
      'description' : new FormControl(rDescription, Validators.required),
      'ingredients' : rIngredients,
    });
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+[1-9]*$/)])
      })
    )
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.recipeForm.value, this.id);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});    
  }
  
}
