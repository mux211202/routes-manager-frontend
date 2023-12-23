import { createAction, props } from '@ngrx/store';
import { AccountType } from './auth.reducer';

export const setAccount = createAction('[Auth] Set Account', props<AccountType>());
export const logOut = createAction('[Auth] Log Out');
