package com.melihovs.routemanagerbackend.demo;

import com.melihovs.routemanagerbackend.entity.User;
import com.melihovs.routemanagerbackend.repostiory.UserRepository;
import com.melihovs.routemanagerbackend.services.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/home")
@RequiredArgsConstructor
public class WelcomeController {

    private final JwtService jwtService;
    private final UserRepository repository;

    @GetMapping
    public ResponseEntity<String> welcomeUser(
            @RequestHeader(value = "Authorization", required = false) String token
    ) {
        if (token != null) {
            String jwtToken = token.substring(7);
            var optional = repository.findByEmail(jwtService.extractEmail(jwtToken));
            if (optional.isPresent()) {
                User user = optional.get();
                return ResponseEntity.ok("Welcome, " + user.getFirstName() + "!\n +" +
                        "token: " + token);
            }
        }
        return ResponseEntity.ok("Welcome!");
    }
}
