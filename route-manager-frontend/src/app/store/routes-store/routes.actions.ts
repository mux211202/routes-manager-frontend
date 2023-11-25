import { createAction, props } from '@ngrx/store';
import { RouteType } from './routes.reducer';

export const addRoute = createAction('[Routes] Addition', props<{route: RouteType}>());