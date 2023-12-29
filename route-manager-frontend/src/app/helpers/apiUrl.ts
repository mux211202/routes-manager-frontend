import {environmentDev} from "../../environments/environment.dev";
import {isDevMode} from "@angular/core";
import {environment} from "../../environments/environment";

export const apiUrl = isDevMode() ? environmentDev.apiUrl : environment.apiUrl;
