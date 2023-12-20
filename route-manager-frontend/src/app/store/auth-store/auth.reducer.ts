import { createReducer, on } from '@ngrx/store';
import { setAccount } from './auth.actions';

export interface AccountType {
    email: string,
}

export interface LoginDto extends AccountType{
    password: string,
}

export const initialState: { account: AccountType } = {
    account: {
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
