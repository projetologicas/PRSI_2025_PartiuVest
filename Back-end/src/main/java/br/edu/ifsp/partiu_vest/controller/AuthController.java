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
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PostMapping;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/auth")
@Tag(name = "Autenticação", description = "Endpoints para Login, Registro e obtenção de dados do usuário autenticado.")
public class AuthController {

    private final UserService userService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthController(UserService userService, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/register")
    @Operation(summary = "Registrar Novo Usuário",
            description = "Cria um novo usuário no sistema com a Role padrão (USER).")
    @ApiResponse(responseCode = "200", description = "Registro bem-sucedido. Retorna os dados do novo usuário.",
            content = @Content(schema = @Schema(implementation = UserResponse.class)))
    @ApiResponse(responseCode = "403", description = "Email já em uso, senha fraca ou dados inválidos.",
            content = @Content)
    public ResponseEntity<UserResponse> register(@Valid @RequestBody RegisterRequest dto) {
        UserResponse response = userService.register(dto);
        if (response == null) {
            return ResponseEntity.status(HttpStatusCode.valueOf(403)).build();
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    @Operation(summary = "Login de Usuário",
            description = "Autentica um usuário usando Email e Senha e retorna um JWT (JSON Web Token) para ser usado em todas as requisições protegidas.")
    @ApiResponse(responseCode = "200", description = "Login bem-sucedido. Retorna o token JWT.",
            content = @Content(schema = @Schema(implementation = AuthResponse.class)))
    @ApiResponse(responseCode = "401", description = "Credenciais inválidas (Email ou Senha incorretos).",
            content = @Content)
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest dto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword())
        );

        User user = (User) authentication.getPrincipal();

        String token = jwtService.generateToken(user);
        return ResponseEntity.ok(new AuthResponse(token));
    }

    @GetMapping("/me")
    @Operation(summary = "Obter Dados do Usuário Autenticado",
            description = "Retorna os dados básicos do usuário logado. Requer um token JWT válido.",
            security = @SecurityRequirement(name = "Bearer Token"))
    @ApiResponse(responseCode = "200", description = "Dados do usuário retornados com sucesso.",
            content = @Content(schema = @Schema(implementation = UserResponse.class)))
    @ApiResponse(responseCode = "401", description = "Token inválido ou expirado.",
            content = @Content)
    public ResponseEntity<UserResponse> getCurrentUser(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(UserResponse.from(user));
    }
}