import {RouteType} from "../store/routes-store/routes.reducer";

export const parseRoutesForRequest = (route: RouteType) => {
  return {
    id: route.key,
    fromValue: {...route.fromValue, coordinates: route.fromValue.location},
    toValue:  {...route.toValue, coordinates: route.toValue.location},
  }
}

export const parseRoutesForFrontend = (routes: any[]): RouteType[] => {
  return routes.map(route => {
    return {
      key: route.id,
      fromValue: {...route.fromValue, location: route.fromValue.coordinates},
      toValue:  {...route.toValue, location: route.toValue.coordinates},
    }
  })
}
