import { Subject } from "rxjs";
import { ShoppingListService } from "./../shopping-list/shopping-list.service";
import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     "Schaboszczak",
  //     "Schab test",
  //     "http://driveimg1.intermarche.com/pl/Content/images/boitmal/produit/zoom/FA651E7CB2CAA962CDF0D0CE310F93F0.jpg",
  //     [new Ingredient("Meat", 5), new Ingredient("French Fries", 20)]
  //   ),
  //   new Recipe(
  //     "Burgir",
  //     "Sum Burgir",
  //     "https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg",
  //     [new Ingredient("Buns", 2), new Ingredient("Meat", 1)]
  //   ),
  // ];
  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  emitNewRecipes() {
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.emitNewRecipes();
  }
}
