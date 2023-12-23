import {RouteType} from "../store/routes-store/routes.reducer";
import {Route} from "@angular/router";

export interface WaypointType {
    waypoint:{
        location: {
            latLng: {
                latitude: number,
                longitude: number,
            }
        }
    }
}

export interface parserReturnType {
  origins: WaypointType[],
  destinations: WaypointType[]
}

const setNecessaryFields = (routes: RouteType[], side: 'fromValue' | 'toValue') => {
  return routes.map( route => {
    const latitude = route[side].location?.lat();
    const longitude = route[side].location?.lng();
    if(latitude && longitude) {
      const waypoint: WaypointType = {
        waypoint: {
          location: {
            latLng: {
              latitude,
              longitude
            }
          }
        }
      }
      return waypoint
    } else {
      throw new Error('No coordinates available!')
    }
  });
}
export const parseRoutesForRouteMatrix = (routes: RouteType[] | any): parserReturnType | undefined => {
  if(routes.length < 2) {
    return undefined
  }

  const origins: WaypointType[] = setNecessaryFields(routes, 'fromValue');
  const destinations: WaypointType[] = setNecessaryFields(routes, 'toValue');

  return {
    origins,
    destinations,
  };
}

export const routeMatrixRequest = async (origins: WaypointType[], destinations: WaypointType[]) => {
    const bodyObj = {
        origins,
        destinations,
        "travelMode": "DRIVE",
        "routingPreference": "TRAFFIC_AWARE"
    }
    const response = await fetch('https://routes.googleapis.com/distanceMatrix/v2:computeRouteMatrix', {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": "AIzaSyApgS9bmdfRrOvGT8544t1xetPRFEuYfT4",
        "X-Goog-FieldMask": "originIndex,destinationIndex,duration,distanceMeters,status,condition"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(bodyObj),
    })
    return await response.json();
}
