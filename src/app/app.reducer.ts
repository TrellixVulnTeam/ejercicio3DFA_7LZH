import { ActionReducerMap } from "@ngrx/store";
import * as reducersAuth from './auth/reducer'
import * as reducersPosts from './posts/reducer'

export interface AppState {
  authApp: reducersAuth.AuthState;
  postsApp: reducersPosts.PostState;
  /* user: UserState;
  categories: CategoriesState;
   */
}

export const appReducers: ActionReducerMap<AppState>={
    authApp:reducersAuth.authReducer,
    postsApp:reducersPosts.postReducer
    /* user:reducers.userReducer,
    categories:reducers.categoryReducer,*/
    
}
