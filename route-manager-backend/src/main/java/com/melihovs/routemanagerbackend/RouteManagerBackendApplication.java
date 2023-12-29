package com.melihovs.routemanagerbackend;

import com.melihovs.routemanagerbackend.entity.routes.PlaceSearchResult;
import com.melihovs.routemanagerbackend.entity.routes.RouteType;
import com.melihovs.routemanagerbackend.repostiory.RouteTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class RouteManagerBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(RouteManagerBackendApplication.class, args);
    }

}
