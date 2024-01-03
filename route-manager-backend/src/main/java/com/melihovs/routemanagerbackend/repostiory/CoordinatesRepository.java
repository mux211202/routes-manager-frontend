package com.melihovs.routemanagerbackend.repostiory;

import com.melihovs.routemanagerbackend.entity.routes.Coordinates;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;

import java.util.Optional;

public interface CoordinatesRepository extends JpaRepository<Coordinates, Long> {

    @Override
    @NonNull
    Optional<Coordinates> findById(@NonNull Long aLong);

    Optional<Coordinates> findByLatAndLng(double lat, double lng);

    boolean existsByLat(double lat);

    boolean existsByLng(double lng);

}
