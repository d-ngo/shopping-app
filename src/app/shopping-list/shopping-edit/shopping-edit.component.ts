import { Component, OnInit, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') seForm : NgForm;
  @ViewChild('test') button : ElementRef;
  subscription : Subscription;
  editMode : boolean = false;
  editedItem : Ingredient;
  editedItemIndex : number;

  constructor(private shoppingListService : ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditting
      .subscribe((index : number) => {
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.editedItemIndex = index;
        this.seForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      });
  }
  
  onSubmit(form: NgForm) {
    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(newIngredient, this.editedItemIndex);
      this.editMode = false;
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    form.reset();
  }
  
  // onDelete() {
  //   this.shoppingListService.deleteIngredient(this.editedItemIndex);
  //   this.onClear();
  // }
  onDelete() {
    console.log(this.button.nativeElement.classList.contains('btn'));
    this.button.nativeElement.classList.addClass('test');
  }

  onClear() {
    this.editMode = false;
    this.seForm.reset();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
