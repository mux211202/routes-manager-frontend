import {RouteType} from "../store/routes-store/routes.reducer";

export interface WaypointType {
  location: {
    latLng: {
      latitude: number,
      longitude: number,
    }
  }
}

export interface parserReturnType {
  origin: WaypointType,
  destination: WaypointType,
  intermediates: WaypointType[]
}

const setNecessaryFields = (routes: any[], side: 'fromValue' | 'toValue') => {
  return routes.map(route => {
    const latitude = route[side].location?.lat;
    const longitude = route[side].location?.lng;
    if (latitude && longitude) {
      const waypoint: WaypointType = {
        location: {
          latLng: {
            latitude,
            longitude
          }
        }
      }
      return waypoint
    } else {
      throw new Error('No coordinates available!')
    }
  });
}
export const parseRouteForPlanning = (routes: RouteType[] | any): parserReturnType | undefined => {
  if (routes.length < 2) {
    return undefined
  }

  const origin = setNecessaryFields([routes[0]], 'fromValue')[0];
  const intermediates: WaypointType[] = setNecessaryFields(routes, 'toValue');

  return {
    origin,
    destination: origin,
    intermediates: [...intermediates]
  };
}

export const routeMatrixRequest = async (route: parserReturnType) => {
  const bodyObj = {
    ...route,
    "travelMode": "DRIVE",
    "optimizeWaypointOrder": "true"
  }
  const response = await fetch('https://routes.googleapis.com/directions/v2:computeRoutes', {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": "AIzaSyApgS9bmdfRrOvGT8544t1xetPRFEuYfT4",
      "X-Goog-FieldMask": "routes.optimizedIntermediateWaypointIndex"
    },
    body: JSON.stringify(bodyObj),
  })
  return await response.json();
}

export const routesPlannerResult = (plan: any, routes: RouteType[] | any): RouteType[] => {
  const result: RouteType[] = [];
  if (plan.length !== routes.length) return [];
  plan.forEach((number: any) => {
    const route = routes[number];
    if (route) result.push(route)
  });
  return result;
}
