import {RouteType} from "../store/routes-store/routes.reducer";

//Takes list of routes and checks if they have one and the same origin
export const hasSameOrigin = (selectedRoutes: string[], routes: RouteType[] | any) => {
  const resultObj: any = {};
  selectedRoutes.forEach(selectedRoute => {
    const route = routes.find((route: any) => route.key === selectedRoute);
    if (route?.fromValue.location) {
      const originLocationKey = route.fromValue.location.lng.toString()
        + route.fromValue.location.lat?.toString();
      if (resultObj[originLocationKey]) resultObj[originLocationKey] += 1
      else resultObj[originLocationKey] = 1
    }
  })
  return Object.keys(resultObj).length === 1;
}
