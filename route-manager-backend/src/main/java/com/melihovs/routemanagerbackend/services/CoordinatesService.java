package com.melihovs.routemanagerbackend.services;

import com.melihovs.routemanagerbackend.repostiory.CoordinatesRepository;
import org.springframework.stereotype.Service;

@Service
public class CoordinatesService {

    private final CoordinatesRepository repository;

    public CoordinatesService(CoordinatesRepository repository) {
        this.repository = repository;
    }
}
