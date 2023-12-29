package com.melihovs.routemanagerbackend.configs;

import com.melihovs.routemanagerbackend.entity.Role;
import com.melihovs.routemanagerbackend.entity.User;
import com.melihovs.routemanagerbackend.repostiory.UserRepository;
import com.melihovs.routemanagerbackend.services.JwtService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class ApplicationInitializer implements CommandLineRunner {

    private final Logger logger = LoggerFactory.getLogger(ApplicationInitializer.class);
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;


    private void initializeUserAndPrintJwtToken() {
        var user = User.builder()
                .firstName("Artjoms")
                .lastName("Melihovs")
                .email("email@inbox.lv")
                .role(Role.USER)
                .password(passwordEncoder.encode("1234"))
                .build();

        repository.save(user);
        logger.info("GENERATED TOKEN FOR INITIAL USER: \n" + jwtService.generateToken(user));
        logger.info("USER DETAILS:\n" +
                "Email: email@inbox.lv\n" +
                "Password: 1234");
    }

    @Override
    public void run(String... args) throws Exception {
        initializeUserAndPrintJwtToken();
    }
}
