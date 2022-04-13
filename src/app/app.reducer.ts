import { ActionReducerMap } from "@ngrx/store";
import * as reducersAuth from './auth/reducer'
import * as reducersPosts from './posts/reducer'

export interface AppState {
  auth: reducersAuth.AuthState;
  posts: reducersPosts.PostState;
  /* user: UserState;
  categories: CategoriesState;
   */
}

export const appReducers: ActionReducerMap<AppState>={
    auth:reducersAuth.authReducer,
    posts:reducersPosts.postReducer
    /* user:reducers.userReducer,
    categories:reducers.categoryReducer,*/
    
}
