package com.melihovs.routemanagerbackend;

import com.melihovs.routemanagerbackend.entity.routes.PlaceSearchResult;
import com.melihovs.routemanagerbackend.entity.routes.RouteType;
import com.melihovs.routemanagerbackend.repostiory.RouteTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class RouteManagerBackendApplication implements CommandLineRunner {

    @Autowired
    private RouteTypeRepository routeTypeRepository;

    public static void main(String[] args) {
        SpringApplication.run(RouteManagerBackendApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {

        PlaceSearchResult placeSearchResult1 = new PlaceSearchResult();
        placeSearchResult1.setAddress("new");
        placeSearchResult1.setName("name");

        PlaceSearchResult placeSearchResult2 = placeSearchResult1;

        routeTypeRepository.save(new RouteType(placeSearchResult2, placeSearchResult1));
    }
}
