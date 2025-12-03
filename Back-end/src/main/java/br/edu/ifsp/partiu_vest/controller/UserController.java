package br.edu.ifsp.partiu_vest.controller;

import br.edu.ifsp.partiu_vest.dto.UserDataResponse;
import br.edu.ifsp.partiu_vest.dto.UserResponse;
import br.edu.ifsp.partiu_vest.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {
    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(UserResponse.from(user));
    }
    @GetMapping("/data")
    public ResponseEntity<UserDataResponse> getUserData(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(UserDataResponse.from(user));
    }
}

