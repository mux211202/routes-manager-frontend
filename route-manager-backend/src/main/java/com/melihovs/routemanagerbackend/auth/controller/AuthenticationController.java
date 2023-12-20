package com.melihovs.routemanagerbackend.auth.controller;

import com.melihovs.routemanagerbackend.auth.data.AuthenticationRequest;
import com.melihovs.routemanagerbackend.auth.data.AuthenticationResponse;
import com.melihovs.routemanagerbackend.auth.data.RegisterRequest;
import com.melihovs.routemanagerbackend.auth.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping(value = "/register", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok()
                .body(service.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.login(request));
    }

}
