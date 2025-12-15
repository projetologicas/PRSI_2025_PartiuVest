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

import java.util.List;

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
            @ApiResponse(responseCode = "403", description = "Acesso Negado (Não é ADMIN)")
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
            @ApiResponse(responseCode = "400", description = "Dados inválidos"),
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

    @Operation(summary = "Lista todos os usuários",
            description = "Retorna uma lista completa de todos os usuários cadastrados no sistema. Requer permissão 'ADMIN'.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista de usuários retornada com sucesso",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = UserResponse.class))),
            @ApiResponse(responseCode = "403", description = "Acesso Negado (Não é ADMIN)")
    })
    @GetMapping("/users")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        return ResponseEntity.ok(userService.findAllUsers());
    }

    @Operation(summary = "Deleta um usuário por ID",
            description = "Remove permanentemente um usuário do sistema. Requer permissão 'ADMIN'.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Usuário deletado com sucesso (No Content)"),
            @ApiResponse(responseCode = "404", description = "Usuário não encontrado"),
            @ApiResponse(responseCode = "403", description = "Acesso Negado (Não é ADMIN)")
    })
    @DeleteMapping("/users/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Deleta um item da loja por ID",
            description = "Remove um item cosmético ou funcional da loja. Requer permissão 'ADMIN'.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Item deletado com sucesso (No Content)"),
            @ApiResponse(responseCode = "404", description = "Item não encontrado"),
            @ApiResponse(responseCode = "403", description = "Acesso Negado (Não é ADMIN)")
    })
    @DeleteMapping("/items/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        shopService.deleteItem(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Atualiza dados de um usuário",
            description = "Permite a atualização de dados específicos de um usuário por um administrador. Requer permissão 'ADMIN'.")
    @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Dados do usuário a serem atualizados",
            required = true, content = @Content(schema = @Schema(implementation = UserUpdateRequest.class)))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Usuário atualizado com sucesso"),
            @ApiResponse(responseCode = "404", description = "Usuário não encontrado"),
            @ApiResponse(responseCode = "400", description = "Dados de atualização inválidos"),
            @ApiResponse(responseCode = "403", description = "Acesso Negado (Não é ADMIN)")
    })
    @PutMapping("/users/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> updateUserAdmin(@PathVariable Long id, @RequestBody UserUpdateRequest dto) {
        userService.updateUser(id, dto);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Atualiza um item da loja",
            description = "Permite a atualização dos detalhes (nome, preço, etc.) de um item da loja por ID. Requer permissão 'ADMIN'.")
    @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Novos dados do item",
            required = true, content = @Content(schema = @Schema(implementation = ItemRequestDTO.class)))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Item atualizado com sucesso"),
            @ApiResponse(responseCode = "404", description = "Item não encontrado"),
            @ApiResponse(responseCode = "400", description = "Dados de atualização inválidos"),
            @ApiResponse(responseCode = "403", description = "Acesso Negado (Não é ADMIN)")
    })
    @PutMapping("/items/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> updateItem(@PathVariable Long id, @RequestBody ItemRequestDTO dto) {
        shopService.updateItem(id, dto);
        return ResponseEntity.ok().build();
    }
}