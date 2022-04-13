import { createAction, props } from "@ngrx/store";
export const createCategory = createAction(
  "[CATEGORY] Create category",
  props<{ title: string; description: string; css_color: string; userId:string }>()
);
