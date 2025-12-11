package br.edu.ifsp.partiu_vest.controller;

import br.edu.ifsp.partiu_vest.dto.UserDataRequest;
import br.edu.ifsp.partiu_vest.dto.UserDataResponse;
import br.edu.ifsp.partiu_vest.dto.UserPublicDataResponse;
import br.edu.ifsp.partiu_vest.dto.UserResponse;
import br.edu.ifsp.partiu_vest.model.User;
import br.edu.ifsp.partiu_vest.service.AttemptService;
import br.edu.ifsp.partiu_vest.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.data.domain.Page;

@RestController
@RequestMapping("/api")
public class UserController {
    private final UserService service;
    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(UserResponse.from(user));
    }
    @GetMapping("/data")
    public ResponseEntity<UserDataResponse> getUserData(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(UserDataResponse.from(user));
    }
    @PostMapping("/data")
    public ResponseEntity<UserPublicDataResponse> getUserPublicData(@Valid @RequestBody UserDataRequest dto) {
        return ResponseEntity.ok(service.getPublicUserData(dto));
    }

    @GetMapping("/leaderboard/xp")
    public ResponseEntity<Page<UserPublicDataResponse>> getXpLeaderboard(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(service.getXpRanking(page, size));
    }

    @GetMapping("/leaderboard/streak")
    public ResponseEntity<Page<UserPublicDataResponse>> getStreakLeaderboard(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(service.getStreakRanking(page, size));
    }
}

