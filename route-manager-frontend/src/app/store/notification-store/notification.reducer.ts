import {createReducer, on} from '@ngrx/store';
import {setNotification, unsetNotification} from './notification.actions';
import {NotificationType} from "../../pages/add-route-page/add-route-page.component";

export const initialState: { notification: NotificationType | undefined} = {
  notification: undefined
};

export const notificationReducer = createReducer(
  initialState,
  on(setNotification, (state, notification) => {
    return {
      notification
    }
  }),
  on(unsetNotification, (state) => {
    return {
      ...initialState
    }
  }),
);
