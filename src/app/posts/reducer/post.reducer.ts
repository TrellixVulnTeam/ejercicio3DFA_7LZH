import { Action, createReducer, on } from "@ngrx/store";
import { PostDTO } from "src/app/Models/post.dto";
import { loadPosts, loadPostsError, loadPostsSuccess } from "../actions";

export interface PostState {
  posts: PostDTO[];
  post: PostDTO;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: PostState = {
  posts: [],
  post: new PostDTO("", "", 0, 0, new Date()),
  loading: false,
  loaded: false,
  error: null,
};

const _postReducer = createReducer(
  initialState,
  on(loadPosts, (state) => ({
    ...state,
    loading: true,
  })),
  on(loadPostsSuccess, (state, { posts }) => ({
    ...state,
    loading: false,
    loaded: true,
    posts: posts,
  })),
  on(loadPostsError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: payload,
  }))
);

export function postReducer(state: PostState | undefined, action: Action) {
  return _postReducer(state, action);
}
