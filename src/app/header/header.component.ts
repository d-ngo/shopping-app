import { AuthService } from './../auth/auth.service';
import { RecipeService } from './../recipes/recipe.service';
import { DataStorageService } from './../data-storage.service';
import { Component, OnInit } from '@angular/core';
// import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private username;

  constructor(
    private dsService : DataStorageService, 
    private recipeService : RecipeService, 
    private authService : AuthService ) { }

  ngOnInit() { }

  onSaveData() {
    this.dsService.storeRecipes().subscribe(
      (response: Response) => {
        console.log(response);
      }
    )
  }

  onFetchData() {
    this.dsService.getRecipes().subscribe(
      (recipes) => {
        console.log(recipes);
        this.recipeService.setRecipes(recipes);
      }
    );
  }

  onLogout() {
    this.authService.logout();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  getUser() {
    return this.authService.getUser();
  }
}

// export class HeaderComponent {
//   likeCounter : number = 100;
//   dislikeCounter : number = 25;
//   liked : boolean = false;
//   disliked : boolean = false;

//   onLikeClick() {
//     if (this.liked) {
//       this.likeCounter--;
//       this.liked = false;
//     } else {
//       this.likeCounter++;
//       this.liked = true;
//       if (this.disliked) {
//         this.disliked = false;
//         this.dislikeCounter--;
//       }
//     }
//   }

//   onDislikeClick() {
//     /**/
//     if (this.disliked) {
//       this.dislikeCounter--;
//       this.disliked = false;
//     } else {
//       this.dislikeCounter++;
//       this.disliked = true;
//       if (this.liked) {
//         this.liked = false;
//         this.likeCounter--;
//       }
//     }
//   }
// }