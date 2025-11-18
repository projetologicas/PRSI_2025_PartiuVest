package br.edu.ifsp.partiu_vest.controller;

import br.edu.ifsp.partiu_vest.dto.AuthRequest;
import br.edu.ifsp.partiu_vest.dto.AuthResponse;
import br.edu.ifsp.partiu_vest.dto.RegisterRequest;
import br.edu.ifsp.partiu_vest.dto.UserResponse;
import br.edu.ifsp.partiu_vest.model.User;
import br.edu.ifsp.partiu_vest.service.JwtService;
import br.edu.ifsp.partiu_vest.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UserService userService;
    private final JwtService jwtService;
    public AuthController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@Valid @RequestBody RegisterRequest dto) {
        UserResponse response = userService.register(dto);
        if (response == null) {
            return ResponseEntity.status(HttpStatusCode.valueOf(403)).build();
        }
        return ResponseEntity.ok(response);
    }
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest dto) {
        User user = userService.checkCredentialsAndReturnUser(dto);
        String token = jwtService.generateToken(user);
        return ResponseEntity.ok(new AuthResponse(token));

    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(UserResponse.from(user));
    }
}
