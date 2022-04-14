import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY, of } from "rxjs";
import { map, mergeMap, catchError } from "rxjs/operators";
import { PostService } from "src/app/Services/post.service";
import { loadPosts, loadPostsError, loadPostsSuccess } from "../actions";

@Injectable()
export class PostEffects {
  constructor(private actions$: Actions, private postService: PostService) {}

  getPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPosts),
      mergeMap(() =>
        this.postService.getPosts().pipe(
          map((postsResults) => loadPostsSuccess({ posts: postsResults })),
          catchError((error) => of(loadPostsError({ payload: error })))
        )
      )
    )
  );
}
