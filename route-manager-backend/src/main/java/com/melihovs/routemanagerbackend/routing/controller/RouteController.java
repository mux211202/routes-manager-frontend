package com.melihovs.routemanagerbackend.routing.controller;

import com.melihovs.routemanagerbackend.entity.routes.RouteType;
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
    public ResponseEntity<String> saveRoute(
            @RequestBody RouteType routeType,
            @RequestHeader(value = "Authorization") String token
    ) {
        return ResponseEntity.ok(routeService.saveRoute(routeType));
    }


}
