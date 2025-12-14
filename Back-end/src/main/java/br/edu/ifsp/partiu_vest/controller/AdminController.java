package br.edu.ifsp.partiu_vest.controller;

import br.edu.ifsp.partiu_vest.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/admin")
@Tag(name = "Administração (Admin)", description = "Endpoints restritos a usuários com a Role 'ADMIN'.")
@SecurityRequirement(name = "Bearer Token")
public class AdminController {

    @GetMapping("/status")
    @PreAuthorize("hasAuthority('ADMIN')")
    @Operation(summary = "Verificar Status de Acesso Admin",
            description = "Endpoint de teste que verifica se o usuário autenticado possui a permissão 'ADMIN'.")
    @ApiResponse(responseCode = "200", description = "Acesso concedido. Retorna uma mensagem de status.",
            content = @Content(mediaType = "text/plain"))
    @ApiResponse(responseCode = "401", description = "Token ausente ou inválido.",
            content = @Content)
    @ApiResponse(responseCode = "403", description = "Usuário autenticado, mas sem a permissão 'ADMIN'.",
            content = @Content)
    public ResponseEntity<String> getAdminStatus(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok("Acesso ADMIN concedido para: " + user.getEmail() +
                ". Role: " + user.getRole().name());
    }
}