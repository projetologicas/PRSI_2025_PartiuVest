package br.edu.ifsp.partiu_vest.controller;

import br.edu.ifsp.partiu_vest.dto.*;
import br.edu.ifsp.partiu_vest.model.User;
import br.edu.ifsp.partiu_vest.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api")
@Tag(name = "Usuário e Dados", description = "Endpoints para obter dados do usuário, rankings e atualizar o perfil.")
@SecurityRequirement(name = "Bearer Token")
public class UserController {

    private final UserService service;
    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping("/data")
    @Operation(summary = "Obter Dados Privados do Usuário",
            description = "Retorna todos os dados de perfil (XP, Pontos, etc.) do usuário logado.")
    @ApiResponse(responseCode = "200", description = "Dados retornados com sucesso.",
            content = @Content(schema = @Schema(implementation = UserDataResponse.class)))
    public ResponseEntity<UserDataResponse> getUserData(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(UserDataResponse.from(user));
    }

    @PostMapping("/data")
    @Operation(summary = "Obter Dados Públicos de Outro Usuário",
            description = "Retorna dados visíveis publicamente de um usuário específico (ID ou E-mail).")
    @ApiResponse(responseCode = "200", description = "Dados públicos retornados.",
            content = @Content(schema = @Schema(implementation = UserPublicDataResponse.class)))
    public ResponseEntity<UserPublicDataResponse> getUserPublicData(@Valid @RequestBody UserDataRequest dto) {
        return ResponseEntity.ok(service.getPublicUserData(dto));
    }

    @GetMapping("/leaderboard/xp")
    @Operation(summary = "Ranking por XP",
            description = "Retorna a lista de usuários ordenada por experiência (XP).")
    @Parameter(name = "page", description = "Número da página (inicia em 0).", example = "0")
    @Parameter(name = "size", description = "Tamanho da página.", example = "10")
    @ApiResponse(responseCode = "200", description = "Ranking de XP retornado.",
            content = @Content(schema = @Schema(implementation = Page.class))) // Idealmente, Page<UserPublicDataResponse>
    public ResponseEntity<Page<UserPublicDataResponse>> getXpLeaderboard(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(service.getXpRanking(page, size));
    }

    @GetMapping("/leaderboard/streak")
    @Operation(summary = "Ranking por Streak (Sequência)",
            description = "Retorna a lista de usuários ordenada pela maior sequência de dias consecutivos de atividade.")
    @Parameter(name = "page", description = "Número da página (inicia em 0).", example = "0")
    @Parameter(name = "size", description = "Tamanho da página.", example = "10")
    @ApiResponse(responseCode = "200", description = "Ranking de Streak retornado.",
            content = @Content(schema = @Schema(implementation = Page.class)))
    public ResponseEntity<Page<UserPublicDataResponse>> getStreakLeaderboard(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(service.getStreakRanking(page, size));
    }

    @PutMapping("/user/update")
    @Operation(summary = "Atualizar Dados do Perfil",
            description = "Atualiza o nome ou outros dados mutáveis do usuário logado.")
    @ApiResponse(responseCode = "200", description = "Atualização bem-sucedida (No Content).",
            content = @Content)
    public ResponseEntity<Void> updateUserData(
            @RequestBody UserUpdateRequest dto,
            @AuthenticationPrincipal User currentUser
    ) {
        service.updateUser(currentUser.getId(), dto);
        return ResponseEntity.ok().build();
    }
}