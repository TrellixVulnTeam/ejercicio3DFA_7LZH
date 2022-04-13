import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CategoriesListComponent } from "./categories/categories-list/categories-list.component";
import { CategoryFormComponent } from "./categories/category-form/category-form.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { HeaderComponent } from "./shared/header/header.component";
import { HomeComponent } from "./shared/home/home.component";
import { LoginComponent } from "./auth/login/login.component";
import { PostFormComponent } from "./posts/post-form/post-form.component";
import { PostsListComponent } from "./posts/posts-list/posts-list.component";
import { ProfileComponent } from "./user/profile/profile.component";
import { RegisterComponent } from "./user/register/register.component";
import { AuthInterceptorService } from "./Services/auth-interceptor.service";
import { FormatDatePipe } from "./Pipes/format-date.pipe";
import { AuthModule } from "./auth/auth.module";
import { CategoryModule } from "./categories/category.module";
import { PostModule } from "./posts/post.module";
import { SharedModule } from "./shared/shared.module";
import { StoreModule } from "@ngrx/store";
import { categoryReducer } from "./categories/reducers/category.reducer";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "src/environments/environment";
import { appReducers } from "./app.reducer";
import { EffectsModule } from "@ngrx/effects";
import { EffctsArray } from "./auth/effects";

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProfileComponent,
    PostsListComponent,
    CategoriesListComponent,
    CategoryFormComponent,
    PostFormComponent,
    FormatDatePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthModule,
    CategoryModule,
    PostModule,
    SharedModule,
    //StoreModule.forRoot({ categories: categoryReducer }),
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot(EffctsArray),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
