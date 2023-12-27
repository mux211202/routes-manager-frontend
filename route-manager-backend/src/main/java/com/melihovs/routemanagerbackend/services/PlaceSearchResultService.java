package com.melihovs.routemanagerbackend.services;

import com.melihovs.routemanagerbackend.repostiory.PlaceSearchResultRepository;
import org.springframework.stereotype.Service;

@Service
public class PlaceSearchResultService {

    private final PlaceSearchResultRepository repository;

    public PlaceSearchResultService(PlaceSearchResultRepository repository) {
        this.repository = repository;
    }
}
