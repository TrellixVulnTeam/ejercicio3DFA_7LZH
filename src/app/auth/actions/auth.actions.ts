import { createAction, props } from "@ngrx/store";
import { AuthDTO } from "src/app/Models/auth.dto";

export const login = createAction("[Login component] Login", props<AuthDTO>());

export const loginSuccess = createAction(
  "[Auth Effects] Login success",
  props<AuthDTO>()
);

export const loginError = createAction(
  "[Auth Effects] Login error",
  props<{ payload: any }>()
);
