package com.melihovs.routemanagerbackend.routing.service;

import com.melihovs.routemanagerbackend.entity.User;
import com.melihovs.routemanagerbackend.entity.routes.Coordinates;
import com.melihovs.routemanagerbackend.entity.routes.PlaceSearchResult;
import com.melihovs.routemanagerbackend.entity.routes.RouteType;
import com.melihovs.routemanagerbackend.services.*;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@AllArgsConstructor
public class RouteService {

    private final Logger logger = LoggerFactory.getLogger(RouteService.class);

    private final RouteTypeService routeTypeService;
    private final CoordinatesService coordinatesService;
    private final JwtService jwtService;
    private final UserService userService;

    public String saveRoute(@NonNull RouteType routeType, @NonNull String token) {

        if (checkIfUserHasRouteType(token, routeType)) return "Already Saved Route";

//        PlaceSearchResult from = routeType.getFromValue();
//        PlaceSearchResult to = routeType.getToValue();
//        from = getPlaceSearchResult(routeType, from);
//        to = getPlaceSearchResult(routeType, to);

//        routeType.setFromValue(from);
//        routeType.setToValue(to);

        Optional<RouteType> optional = checkForExistingRouteTypeRecord(routeType.getId());
        if (optional.isPresent()) {
            RouteType routeTypeSaved = optional.get();
            saveRouteForUser(routeTypeSaved, token);
        } else {
            routeTypeService.saveRouteType(routeType);
            saveRouteForUser(routeType, token);
        }

        return "Saved";
    }

    public List<RouteType> getRouteTypes(String token) {
        token = token.substring(7);
        var optional = userService.findByEmail(jwtService.extractEmail(token));
        if (optional.isPresent()) {
            User user = optional.get();
            return new ArrayList<>(user.getSavedRouteTypes());
        }
        return new ArrayList<>();
    }

    private void saveRouteForUser(RouteType routeType, String token) {
        token = token.substring(7);
        var optionalUser = userService.findByEmail(jwtService.extractEmail(token));
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            userService.addRoute(user, routeType);
        }
    }

    private PlaceSearchResult getPlaceSearchResult(RouteType routeType, PlaceSearchResult from) {
        if (checkForExistingCoordinates(routeType.getFromValue().getCoordinates())) {
            Optional<Coordinates> coordinatesFrom = coordinatesService.findByParameters(routeType.getFromValue().getCoordinates());
            if (coordinatesFrom.isPresent()) {
                from = coordinatesFrom.get().getPlaceSearchResults();
            }
        }
        return from;
    }

    private boolean checkIfUserHasRouteType(String token, RouteType routeType) {
        token = token.substring(7);
        var optionalUser = userService.findByEmail(jwtService.extractEmail(token));
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            Set<RouteType> routeTypes = user.getSavedRouteTypes();
            return routeTypes.contains(routeType);
         }
        return false;
    }

    private Optional<RouteType> checkForExistingRouteTypeRecord(@NonNull String id) {
       return routeTypeService.findById(id);
    }

    private boolean checkForExistingCoordinates(Coordinates coordinates) {
        return coordinatesService.checkIfCoordinatesExist(coordinates);
    }

}
