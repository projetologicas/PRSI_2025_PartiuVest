package br.edu.ifsp.partiu_vest.controller;

import br.edu.ifsp.partiu_vest.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
public class AdminController {
    @GetMapping("/status")
    public ResponseEntity<String> getAdminStatus(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok("Acesso ADMIN concedido para: " + user.getEmail() +
                ". Role: " + user.getRole().name());
    }
}