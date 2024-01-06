import { createAction, props } from '@ngrx/store';
import {NotificationType} from "../../pages/add-route-page/add-route-page.component";

export const setNotification = createAction('[Notification] Set Notification', props<NotificationType>());
export const unsetNotification = createAction('[Notification] Unset Notification');
