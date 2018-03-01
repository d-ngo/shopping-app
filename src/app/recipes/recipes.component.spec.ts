import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RecipesComponent } from './recipes.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';

import { RecipeService } from './recipe.service';
import { ShoppingListService } from './../shopping-list/shopping-list.service';

describe('RecipesComponent', () => {
  let component: RecipesComponent;
  let fixture: ComponentFixture<RecipesComponent>;
  let rService: RecipeService;
  let spy, http;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecipesComponent, RecipeListComponent, RecipeItemComponent],
      imports: [RouterTestingModule.withRoutes([
        { path: 'settings/:collection/edit/:item', component: RecipeListComponent }
       ]),
       HttpClientTestingModule
      ],
      providers: [
        RecipeService,
        ShoppingListService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {  
    fixture = TestBed.createComponent(RecipesComponent);
    component = fixture.debugElement.componentInstance;

    rService = fixture.debugElement.injector
      .get(RecipeService);

    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should load recipes', () => {
    expect(component.testRecipe).toEqual(rService.recipes);
  });

});
