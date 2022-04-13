import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostDTO } from 'src/app/Models/post.dto';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { PostService } from 'src/app/Services/post.service';
import { SharedService } from 'src/app/Services/shared.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { loadPosts } from '../actions';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent {
  posts!: PostDTO[];
  constructor(
    private postService: PostService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private sharedService: SharedService,
    private store:Store<AppState>
  ) {
    this.loadPosts();
  }

  private loadPosts() {
    /* let errorResponse: any;
    const userId = this.localStorageService.get('user_id');
    if (userId) {
      
      this.postService.getPostsByUserId(userId).subscribe(
        (postsResult) => {
          this.posts = postsResult;
        },
        (error: any) => {
          errorResponse = error.error;
          this.sharedService.errorLog(errorResponse);
        }
      );
    } */
    //TODO<-----Falta comprobar la variable userid
    this.store.dispatch(loadPosts());
  }

  createPost(): void {
    this.router.navigateByUrl('/user/post/');
  }

  updatePost(postId: string): void {
    this.router.navigateByUrl('/user/post/' + postId);
  }

  deletePost(postId: string) {
    let errorResponse: any;

    // show confirmation popup
    let result = confirm('Confirm delete post with id: ' + postId + ' .');
    if (result) {
      /* try {
        const rowsAffected = await this.postService.deletePost(postId);
        if (rowsAffected.affected > 0) {
          this.loadPosts();
        }
      } catch (error: any) {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      } */
      this.postService.deletePost(postId).subscribe(
        (postResult) => {
          const rowsAffected = postResult;
          if (rowsAffected.affected > 0) {
            this.loadPosts();
          }
        },
        (error: any) => {
          errorResponse = error.error;
          this.sharedService.errorLog(errorResponse);
        }
      );
    }
  }
}
