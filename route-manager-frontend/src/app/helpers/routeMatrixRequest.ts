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

export const routeMatrixRequest = async (origins: WaypointType[], destinations: WaypointType[]) => {
    const bodyObj = {
        origins,
        destinations,
        "travelMode": "DRIVE",
        "routingPreference": "TRAFFIC_AWARE"
    }
    const request = await fetch('https://routes.googleapis.com/distanceMatrix/v2:computeRouteMatrix', {
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

    return await request.json();
}