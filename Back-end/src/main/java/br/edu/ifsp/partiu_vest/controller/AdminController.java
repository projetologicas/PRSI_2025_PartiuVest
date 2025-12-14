package br.edu.ifsp.partiu_vest.controller;

import br.edu.ifsp.partiu_vest.dto.*;
import br.edu.ifsp.partiu_vest.service.*;
import br.edu.ifsp.partiu_vest.model.User;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@SecurityRequirement(name = "Bearer Token")
public class AdminController {

    private final UserService userService;
    private final ShopService shopService;
    private final QuestionBookService questionBookService;

    public AdminController(UserService userService, ShopService shopService, QuestionBookService questionBookService) {
        this.userService = userService;
        this.shopService = shopService;
        this.questionBookService = questionBookService;
    }

    @GetMapping("/status")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> getAdminStatus(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok("Acesso ADMIN concedido para: " + user.getEmail());
    }

    @PostMapping("/users")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> createUser(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(userService.register(request));
    }

    @PostMapping("/items")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> createShopItem(@RequestBody ItemRequestDTO dto) {
        shopService.createItem(dto);
        return ResponseEntity.ok("Item criado com sucesso!");
    }

    @PostMapping("/exams")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> createExamFromJson(@RequestBody ExamJsonDTO examData) {
        questionBookService.createExamFromJSON(examData);
        return ResponseEntity.ok("Simulado importado com sucesso!");
    }
}