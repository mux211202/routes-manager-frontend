import {RouteType} from "../store/routes-store/routes.reducer"

export const createRouteKey = (route: RouteType): RouteType => {
  const {fromValue, toValue} = route;
  if (fromValue?.location && toValue?.location) {
    const key = toValue.location.lat().toString()
      + fromValue.location.lng().toString()
      + fromValue.location.lat().toString()
      + toValue.location.lng().toString();

    route.key = key;
  } else {
    route.key = route.fromValue.address + route.toValue.address;
  }
  return route;
}
