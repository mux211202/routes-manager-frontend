package com.melihovs.routemanagerbackend.routing.service;

import com.melihovs.routemanagerbackend.entity.routes.RouteType;
import com.melihovs.routemanagerbackend.services.RouteTypeService;
import lombok.AllArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class RouteService {

    private final RouteTypeService routeTypeService;

    public String saveRoute(@NonNull RouteType routeType) {

        Optional<RouteType> optional = checkForExistingRouteTypeRecord(routeType.getId());
        if (optional.isPresent()) return "Route already exists";

        routeTypeService.saveRouteType(routeType);
        return "Saved";
    }

    private Optional<RouteType> checkForExistingRouteTypeRecord(@NonNull String id) {
       return routeTypeService.findById(id);
    }


}
