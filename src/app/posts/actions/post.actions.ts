import { createAction, props } from "@ngrx/store";
import { PostDTO } from "src/app/Models/post.dto";

export const loadPosts = createAction("[Posts list] Load posts");

export const loadPostsSuccess = createAction(
  "[Posts list] Load posts success",
  props<{ posts: PostDTO[] }>()
);

export const loadPostsError = createAction(
  "[Posts Lists] Load posts error",
  props<{ payload: any }>()
);
