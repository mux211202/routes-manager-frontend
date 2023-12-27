package com.melihovs.routemanagerbackend.repostiory;

import com.melihovs.routemanagerbackend.entity.routes.PlaceSearchResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;

import java.util.Optional;

public interface PlaceSearchResultRepository extends JpaRepository<PlaceSearchResult, Long> {

    Optional<PlaceSearchResult> findPlaceSearchResultById(@NonNull Long id);
}
