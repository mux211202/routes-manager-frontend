package com.melihovs.routemanagerbackend.services;

import com.melihovs.routemanagerbackend.entity.routes.Coordinates;
import com.melihovs.routemanagerbackend.entity.routes.PlaceSearchResult;
import com.melihovs.routemanagerbackend.repostiory.PlaceSearchResultRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class PlaceSearchResultService {

    private final PlaceSearchResultRepository repository;

    public Optional<PlaceSearchResult> findByCoordinates(Coordinates coordinates) {
        return repository.findPlaceSearchResultByCoordinates_LatAndCoordinates_Lng(coordinates.getLat(), coordinates.getLng());
    }

}
