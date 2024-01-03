package com.melihovs.routemanagerbackend.services;

import com.melihovs.routemanagerbackend.entity.User;
import com.melihovs.routemanagerbackend.entity.routes.RouteType;
import com.melihovs.routemanagerbackend.repostiory.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public void addRoute(User user, RouteType routeType) {
        Set<RouteType> routes = user.getSavedRouteTypes();
        routes.add(routeType);
        user.setSavedRouteTypes(routes);

        userRepository.save(user);
    }

}
