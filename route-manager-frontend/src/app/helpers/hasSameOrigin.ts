import {RouteType} from "../store/routes-store/routes.reducer";

export const hasSameOrigin = (selectedRoutes: string[], routes: RouteType[] | any) => {
  const resultObj: any = {};
  selectedRoutes.forEach(selectedRoute => {
    const route = routes.find((route: any) => route.key === selectedRoute);
    if(route?.fromValue.location) {
      const originLocationKey = route.fromValue.location.lng().toString()
        + route.fromValue.location.lat()?.toString();
      if (resultObj[originLocationKey]) resultObj[originLocationKey] += 1
      else resultObj[originLocationKey] = 1
    }
  })
  console.log(resultObj)
  return Object.keys(resultObj).length === 1;
}
