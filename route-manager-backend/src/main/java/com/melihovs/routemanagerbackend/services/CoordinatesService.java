package com.melihovs.routemanagerbackend.services;

import com.melihovs.routemanagerbackend.repostiory.CoordinatesRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CoordinatesService {

    private final CoordinatesRepository repository;

//    public boolean checkIfCoordinatesExist(Coordinates coordinates) {
//        return repository.existsByLat(coordinates.getLat()) &&
//                repository.existsByLng(coordinates.getLng());
//    }
}
