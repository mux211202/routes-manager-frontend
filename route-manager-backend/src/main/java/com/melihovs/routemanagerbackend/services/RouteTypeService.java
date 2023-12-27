package com.melihovs.routemanagerbackend.services;

import com.melihovs.routemanagerbackend.repostiory.RouteTypeRepository;
import org.springframework.stereotype.Service;

@Service
public class RouteTypeService {

    private final RouteTypeRepository repository;

    public RouteTypeService(RouteTypeRepository repository) {
        this.repository = repository;
    }
}
