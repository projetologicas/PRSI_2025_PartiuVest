package br.edu.ifsp.partiu_vest.controller;

import br.edu.ifsp.partiu_vest.dto.*;
import br.edu.ifsp.partiu_vest.model.Attempt;
import br.edu.ifsp.partiu_vest.model.AttemptQuestion;
import br.edu.ifsp.partiu_vest.model.Question;
import br.edu.ifsp.partiu_vest.model.User;
import br.edu.ifsp.partiu_vest.service.AttemptService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/attempt")
@Tag(name = "Tentativas (Attempt)", description = "Gerenciamento do ciclo de vida das tentativas de prova: iniciar, obter status, responder questões e finalizar.")
@SecurityRequirement(name = "Bearer Token")
public class AttemptController {

    private final AttemptService attempt_service;

    public AttemptController(AttemptService attemptService) {
        attempt_service = attemptService;
    }

    @PostMapping("/new")
    @Operation(summary = "Iniciar Nova Tentativa (Prova)",
            description = "Cria uma nova instância de tentativa (`Attempt`) baseada em um `Question Book`.")
    @ApiResponse(responseCode = "200", description = "Tentativa criada com sucesso. Retorna o ID da nova tentativa.",
            content = @Content(schema = @Schema(implementation = AttemptResponse.class)))
    @ApiResponse(responseCode = "400", description = "ID do Question Book inválido ou ausente.",
            content = @Content)
    public ResponseEntity<AttemptResponse> newAttempt(@Valid @RequestBody AttemptRequest dto, @AuthenticationPrincipal User user) {
        System.out.println(dto.getQuestion_book_id());
        return ResponseEntity.ok(attempt_service.newAttempt(dto.getQuestion_book_id(), user));
    }

    @PostMapping("/")
    @Operation(summary = "Obter Tentativa por ID",
            description = "Busca o status completo de uma tentativa específica.")
    @ApiResponse(responseCode = "200", description = "Tentativa encontrada.",
            content = @Content(schema = @Schema(implementation = AttemptResponse.class)))
    @ApiResponse(responseCode = "404", description = "Tentativa não encontrada ou ID ausente.",
            content = @Content)
    public ResponseEntity<AttemptResponse> getAttemptById(@Valid @RequestBody AttemptRequest dto) {
        Attempt attempt = attempt_service.getAttemptById(dto);
        AttemptResponse response = new AttemptResponse();
        return ResponseEntity.ok(response.from(attempt));
    }

    @PostMapping("/question_book")
    @Operation(summary = "Listar Tentativas por Caderno de Questões",
            description = "Retorna o histórico de todas as tentativas que o usuário fez em um `Question Book` específico.")
    @ApiResponse(responseCode = "200", description = "Lista de tentativas retornada.",
            content = @Content(array = @ArraySchema(schema = @Schema(implementation = AttemptResponse.class))))
    public ResponseEntity<HashSet<AttemptResponse>> getAttemptsByQuestionBook(@Valid @RequestBody AttemptRequest dto) {
        Set<Attempt> set = new HashSet<>(attempt_service.getAttemptsByQuestionBook(dto));
        Iterator<Attempt> iterator = set.iterator();
        HashSet<AttemptResponse> response = new HashSet<>();
        while (iterator.hasNext()) {
            response.add(AttemptResponse.from(iterator.next()));
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{attempt_id}/questions")
    @Operation(summary = "Listar Questões de uma Tentativa",
            description = "Retorna a lista de todas as questões que fazem parte da tentativa (`AttemptQuestion`).")
    @Parameter(name = "attempt_id", description = "ID da tentativa.", required = true, example = "101")
    @ApiResponse(responseCode = "200", description = "Lista de questões da tentativa (AttemptQuestion) retornada.",
            content = @Content(array = @ArraySchema(schema = @Schema(implementation = AttemptQuestionResponse.class))))
    @ApiResponse(responseCode = "404", description = "Tentativa não encontrada.",
            content = @Content)
    public ResponseEntity<HashSet<AttemptQuestionResponse>> getAttemptQuestions(@PathVariable Long attempt_id) {
        Iterator<AttemptQuestion> iterator = attempt_service.getQuestionsByAttempt(attempt_id).iterator();
        HashSet<AttemptQuestionResponse> response = new HashSet<>();
        while (iterator.hasNext()) {
            response.add(AttemptQuestionResponse.from(iterator.next()));
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/question_commit")
    @Operation(summary = "Commitar Resposta de Questão",
            description = "Salva a resposta do usuário para uma questão específica dentro de uma tentativa em andamento.")
    @ApiResponse(responseCode = "200", description = "Resposta registrada com sucesso.",
            content = @Content(schema = @Schema(implementation = AttemptQuestionResponse.class)))
    @ApiResponse(responseCode = "400", description = "Dados da requisição inválidos (ex: ID da questão ou resposta ausente).",
            content = @Content)
    public ResponseEntity<AttemptQuestionResponse> commitAttemptQuestion(@Valid @RequestBody AttemptQuestionRequest dto) {
        return ResponseEntity.ok(attempt_service.commitQuestionAnswer(dto));
    }

    @GetMapping("/attempt_question")
    @Operation(summary = "Obter Tentativa-Questão (AttemptQuestion) por ID",
            description = "Retorna os detalhes de uma questão específica dentro de uma tentativa (inclui resposta do usuário e status de acerto).")
    @Parameter(name = "attempt_question_id", description = "ID da relação Questão-Tentativa.", required = true, example = "205")
    @ApiResponse(responseCode = "200", description = "Detalhes da Questão-Tentativa retornados.",
            content = @Content(schema = @Schema(implementation = AttemptQuestionResponse.class)))
    @ApiResponse(responseCode = "404", description = "ID não encontrado.",
            content = @Content)
    public ResponseEntity<AttemptQuestionResponse> getAttemptQuestionById(@RequestParam(required = true) Long attempt_question_id) {
        return ResponseEntity.ok(AttemptQuestionResponse.from(attempt_service.getAttemptQuestionById(attempt_question_id)));
    }

    @GetMapping("/question")
    @Operation(summary = "Obter Questão Completa por AttemptQuestion ID",
            description = "Retorna os dados da questão original, dado o ID da relação Questão-Tentativa.")
    @Parameter(name = "attempt_question_id", description = "ID da relação Questão-Tentativa.", required = true, example = "205")
    @ApiResponse(responseCode = "200", description = "Dados da questão retornados.",
            content = @Content(schema = @Schema(implementation = QuestionResponse.class)))
    @ApiResponse(responseCode = "404", description = "ID não encontrado.",
            content = @Content)
    public ResponseEntity<QuestionResponse> getQuestionByAttemptQuestionId(@RequestParam(required = true) Long attempt_question_id) {
        return ResponseEntity.ok(QuestionResponse.from(attempt_service.getQuestionByAttemptQuestionId(attempt_question_id)));
    }

    @PostMapping("/finish")
    @Operation(summary = "Finalizar Tentativa (Prova)",
            description = "Marca a tentativa como concluída, calcula a pontuação final e atualiza o XP/Pontos do usuário.")
    @ApiResponse(responseCode = "200", description = "Tentativa finalizada com sucesso. Retorna o status final.",
            content = @Content(schema = @Schema(implementation = AttemptResponse.class)))
    @ApiResponse(responseCode = "400", description = "Tentativa já finalizada ou ID ausente.",
            content = @Content)
    public ResponseEntity<AttemptResponse> finishAttempt(@RequestBody AttemptRequest dto) {
        return ResponseEntity.ok(attempt_service.finishAttempt(dto.getId()));
    }
}