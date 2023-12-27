package com.melihovs.routemanagerbackend.repostiory;

import com.melihovs.routemanagerbackend.entity.routes.RouteType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;

import java.util.Optional;

public interface RouteTypeRepository extends JpaRepository<RouteType, String> {

    @NonNull
    Optional<RouteType> findById(@NonNull String id);

}
