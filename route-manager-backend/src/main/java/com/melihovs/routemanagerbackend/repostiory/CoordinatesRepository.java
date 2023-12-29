package com.melihovs.routemanagerbackend.repostiory;

import com.melihovs.routemanagerbackend.entity.routes.Coordinates;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;

import java.util.Optional;

public interface CoordinatesRepository extends JpaRepository<Coordinates, Long> {

    @Override
    Optional<Coordinates> findById(@NonNull Long aLong);

}
