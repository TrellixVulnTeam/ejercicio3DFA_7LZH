import { Action, createReducer, on } from "@ngrx/store";
import { CategoryDTO } from "src/app/Models/category.dto";
import { createCategory } from "../actions/category.actions";

export const initialState: CategoryDTO[] = [];

const _categoryReducer = createReducer(
  initialState,
  on(createCategory, (state, { title, description, css_color, userId }) => [
    ...state,
    new CategoryDTO(title, description, css_color),
  ])
);

export function categoryReducer(
  state: CategoryDTO[] | undefined,
  action: Action
) {
  return _categoryReducer(state, action);
}
