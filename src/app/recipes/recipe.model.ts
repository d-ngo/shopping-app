import { Ingredient } from "../shared/ingredient.model";

export class Recipe {
    public name: String;
    public description: String;
    public imgPath: String;
    public ingredients: Ingredient[];

    constructor(name: String, description: String, imgPath: String, ingredients: Ingredient[]){
        this.name = name;
        this.description = description;
        this.imgPath = imgPath;
        this.ingredients = ingredients;
    }
}