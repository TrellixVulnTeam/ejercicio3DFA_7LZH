import { localizedString } from "@angular/compiler/src/output/output_ast";
import { act } from "@ngrx/effects";
import { Action, createReducer, on } from "@ngrx/store";
import { AuthDTO } from "src/app/Models/auth.dto";
import { login, loginError, loginSuccess } from "../actions";

export interface AuthState {
  credentials: AuthDTO;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: AuthState = {
  credentials: new AuthDTO("", "", "", ""),
  loading: false,
  loaded: false,
  error: null,
};

const _authReducer = createReducer(
  initialState,
  on(login, (state, action) => ({
    ...state,
    loading: true,
    loaded: false,
    credentials: action,
  })),
  on(loginSuccess, (state, action) => ({
    ...state,
    loading: false,
    loaded: true,
    credentials: {
      user_id: action.user_id,
      access_token: action.access_token,
      email: action.email,
      password: action.password,
    },
  })),
  on(loginError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: payload,
  }))
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return _authReducer(state, action);
}
