import { createReducer, on } from '@ngrx/store';
import { addRoute } from './routes.actions';
import { PlaceSearchResult } from '../../components/autocomplete/autocomplete.component';

export interface RouteType {
  key: string,
  toValue: PlaceSearchResult,
  fromValue: PlaceSearchResult
}

export const initialState: RouteType[] = [];

export const routesReducer = createReducer(
  initialState,
  on(addRoute, (state, { route }) => {
    return state.concat(route);
  }),
);