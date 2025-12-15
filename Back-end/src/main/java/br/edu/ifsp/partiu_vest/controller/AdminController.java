package br.edu.ifsp.partiu_vest.controller;

import br.edu.ifsp.partiu_vest.dto.*;
import br.edu.ifsp.partiu_vest.service.*;
import br.edu.ifsp.partiu_vest.model.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@Tag(name = "Administrador", description = "Gerenciamento de funções de cadastro do administrador do sistema")
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

    @Operation(summary = "Verifica o status de Admin",
            description = "Endpoint de teste que verifica se o usuário autenticado tem a permissão 'ADMIN' e retorna seu email.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Acesso concedido com sucesso",
                    content = @Content(mediaType = "text/plain", schema = @Schema(implementation = String.class))),
            @ApiResponse(responseCode = "403", description = "Acesso Negado (Não é ADMIN)",
                    content = @Content(mediaType = "application/json"))
    })
    @GetMapping("/status")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> getAdminStatus(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok("Acesso ADMIN concedido para: " + user.getEmail());
    }

    @Operation(summary = "Cria um novo usuário",
            description = "Cria um novo usuário no sistema. Requer permissão 'ADMIN'.")
    @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Dados de registro do novo usuário",
            required = true, content = @Content(schema = @Schema(implementation = RegisterRequest.class)))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Usuário criado com sucesso",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = UserResponse.class))),
            @ApiResponse(responseCode = "400", description = "Dados inválidos",
                    content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "403", description = "Acesso Negado (Não é ADMIN)")
    })
    @PostMapping("/users")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> createUser(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(userService.register(request));
    }

    @Operation(summary = "Cria um novo item na Loja",
            description = "Adiciona um novo item cosmético ou funcional à loja do jogo. Requer permissão 'ADMIN'.")
    @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Dados do item a ser criado",
            required = true, content = @Content(schema = @Schema(implementation = ItemRequestDTO.class)))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Item criado com sucesso"),
            @ApiResponse(responseCode = "400", description = "Dados inválidos do item"),
            @ApiResponse(responseCode = "403", description = "Acesso Negado (Não é ADMIN)")
    })
    @PostMapping("/items")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> createShopItem(@RequestBody ItemRequestDTO dto) {
        shopService.createItem(dto);
        return ResponseEntity.ok("Item criado com sucesso!");
    }

    @Operation(summary = "Importa um Simulado (Exam) via JSON",
            description = "Processa um arquivo JSON para criar um novo simulado (conjunto de questões) no banco de dados. Requer permissão 'ADMIN'.")
    @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Dados do simulado em formato JSON",
            required = true, content = @Content(schema = @Schema(implementation = ExamJsonDTO.class)))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Simulado importado com sucesso"),
            @ApiResponse(responseCode = "400", description = "Formato JSON inválido ou dados incorretos"),
            @ApiResponse(responseCode = "403", description = "Acesso Negado (Não é ADMIN)")
    })
    @PostMapping("/exams")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> createExamFromJson(@RequestBody ExamJsonDTO examData) {
        questionBookService.createExamFromJSON(examData);
        return ResponseEntity.ok("Simulado importado com sucesso!");
    }
}