import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { HeaderMenus } from "src/app/Models/header-menus.dto";
import { PostDTO } from "src/app/Models/post.dto";
import { HeaderMenusService } from "src/app/Services/header-menus.service";
import { LocalStorageService } from "src/app/Services/local-storage.service";
import { PostService } from "src/app/Services/post.service";
import { SharedService } from "src/app/Services/shared.service";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducer";
import { loadPosts, loadPostsSuccess } from "src/app/posts/actions";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
  posts!: PostDTO[];
  showButtons: boolean;
  constructor(
    private postService: PostService,
    private localStorageService: LocalStorageService,
    private sharedService: SharedService,
    private router: Router,
    private headerMenusService: HeaderMenusService,
    private store: Store<AppState>
  ) {
    this.showButtons = false;
    //this.loadPosts();
  }

  ngOnInit(): void {
    /* this.headerMenusService.headerManagement.subscribe(
      (headerInfo: HeaderMenus) => {
        if (headerInfo) {
          this.showButtons = headerInfo.showAuthSection;
        }
      }
    ); */
    this.store.dispatch(loadPosts());
    //TODO<-----Falta comprobar la variable userid
    this.store.select("auth").subscribe((authResponse)=>{
      const userId = authResponse.credentials.user_id;
      console.log("UserId: " + userId);
    });

    this.store.select("posts").subscribe((postsResponse) => {
      this.posts = postsResponse.posts;
    });
    
  }
  /* private loadPosts() {
     let errorResponse: any;
    const userId = this.localStorageService.get('user_id');
    if (userId) {
      this.showButtons = true;
    }
    
    this.postService.getPosts().subscribe(
      (postsResults) => {
        this.posts = postsResults;
      },
      (error: any) => {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      }
    ); 
  } */

  like(postId: string) {
    let errorResponse: any;
    /* try {
      await this.postService.likePost(postId);
      this.loadPosts();
    } catch (error: any) {
      errorResponse = error.error;
      this.sharedService.errorLog(errorResponse);
    } */
    this.postService.likePost(postId).subscribe(
      (postResult) => {
        //this.loadPosts();
      },
      (error: any) => {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      }
    );
  }

  dislike(postId: string) {
    let errorResponse: any;
    /* try {
      await this.postService.dislikePost(postId);
      this.loadPosts();
    } catch (error: any) {
      errorResponse = error.error;
      this.sharedService.errorLog(errorResponse);
    } */
    this.postService.dislikePost(postId).subscribe(
      (postResult) => {
        //this.loadPosts();
      },
      (error: any) => {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      }
    );
  }
}
