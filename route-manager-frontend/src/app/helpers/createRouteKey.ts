import { RouteType } from "../store/routes-store/routes.reducer"

export const createRouteKey = (route: RouteType): RouteType => {
    const {fromValue, toValue} = route;
    if(fromValue?.location && toValue?.location) {
        const a = toValue.location.lat.toString();
        const b = fromValue.location.lng.toString();
        const c = fromValue.location.lat.toString()
        const d = toValue.location.lng.toString()

        route.key = a + b + c + d;
    } else {
        route.key = route.fromValue.address + route.toValue.address;
    }
    return route;
}