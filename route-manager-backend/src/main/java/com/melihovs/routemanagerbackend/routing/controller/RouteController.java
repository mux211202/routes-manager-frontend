package com.melihovs.routemanagerbackend.routing.controller;

import com.melihovs.routemanagerbackend.entity.routes.RouteType;
import com.melihovs.routemanagerbackend.routing.data.RouteTypeGettingResponse;
import com.melihovs.routemanagerbackend.routing.data.RouteTypeSavingResponse;
import com.melihovs.routemanagerbackend.routing.service.RouteService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("/api/v1/route")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class RouteController {

    private final RouteService routeService;

    @PostMapping(value = "/save", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<RouteTypeSavingResponse> saveRoute(
            @RequestBody RouteType routeType,
            @RequestHeader(value = "Authorization") String token
    ) {
        RouteTypeSavingResponse response = new RouteTypeSavingResponse(routeService.saveRoute(routeType, token));
        return ResponseEntity.ok(response);
    }

    @GetMapping(value = "/get-routes")
    public ResponseEntity<RouteTypeGettingResponse> getRoutes(
            @RequestHeader(value = "Authorization") String token
    ) {
        RouteTypeGettingResponse response = new RouteTypeGettingResponse(routeService.getRouteTypes(token));
        return ResponseEntity.ok(response);
    }


}
