import { createReducer, on } from '@ngrx/store';
import { setAccount } from './auth.actions';

export interface AccountType {
    firstName: string,
    lastName: string,
    email: string,
}

export interface LoginDto extends AccountType{
    password: string,
}

export const initialState: { account: AccountType } = {
    account: {
        firstName: '',
        lastName: '',
        email: '',
    }
};

export const authReducer = createReducer(
  initialState,
  on(setAccount, (state,  account) => {
    console.log('setAccount')
    return {
        ...state,
        account
    }
  }),
);