import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { AuthService } from "src/app/Services/auth.service";
import { login, loginError, loginSuccess } from "../actions";
import { mergeMap, map, catchError } from "rxjs/operators";
import { AuthDTO } from "src/app/Models/auth.dto";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService, private router:Router) {}

  postLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap((action) =>
        this.authService.login(action).pipe(
          map((authResult) =>
            loginSuccess({
              access_token: authResult.access_token,
              email: action.email,
              password: action.password,
              user_id: authResult.user_id,
            })
          ),
          catchError((err) => of(loginError({ payload: err })))
        )
      )
    )
  );

  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loginSuccess),
        map((action) => {
          this.router.navigateByUrl("home");
        })
      );
    },
    { dispatch: false }
  );
}
