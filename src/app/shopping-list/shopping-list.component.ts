import { Ingredient } from './../shared/ingredient.model';
import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients : Ingredient[];
  subscription: Subscription;

  constructor(private shoppingListService : ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.subscription = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients : Ingredient[]) => {this.ingredients = ingredients}
    )
  }
 
  onEditItem(index: number) {
    this.shoppingListService.startedEditting.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
}
