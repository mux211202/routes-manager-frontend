package com.melihovs.routemanagerbackend.services;

import com.melihovs.routemanagerbackend.entity.routes.RouteType;
import com.melihovs.routemanagerbackend.repostiory.RouteTypeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class RouteTypeService {

    private final RouteTypeRepository repository;

    public void saveRouteType(RouteType routeType) {
        repository.save(routeType);
    }

    public Optional<RouteType> findById(String id) {
        return repository.findById(id);
    }
}
